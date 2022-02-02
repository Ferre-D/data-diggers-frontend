import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Theme } from '../theme';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable, Subscription } from 'rxjs';
import { ThemesService } from '../themes.service';
import {
  AngularFireStorage,
  AngularFireStorageReference,
  AngularFireUploadTask,
} from '@angular/fire/compat/storage';
import { ToastrService } from 'ngx-toastr';
import { Store } from '@ngrx/store';
import * as ThemeActions from '../../../actions/theme.actions';

interface AppState {
  theme: Theme;
}
@Component({
  selector: 'app-themes-form',
  templateUrl: './themes-form.component.html',
  styleUrls: ['./themes-form.component.scss'],
})
export class ThemesFormComponent implements OnInit, OnDestroy {
  isAdd: boolean = false;
  isEdit: boolean = false;
  themeId: number = 0;
  active: boolean = false;

  isSubmitted: boolean = false;
  nameChangeMessage: string = '';
  isImageChanged: boolean = false;
  imageSrc?: string | ArrayBuffer;

  theme$: Subscription = new Subscription();
  postTheme$: Subscription = new Subscription();
  putTheme$: Subscription = new Subscription();

  themeForm = new FormGroup({
    id: new FormControl(0),
    primaryColor: new FormControl('', Validators.required),
    accentColor: new FormControl('', Validators.required),
    logoUrl: new FormControl(''),
    active: new FormControl('false'),
    textWhite: new FormControl(false),
  });
  //firebase
  ref: AngularFireStorageReference | undefined;
  task: AngularFireUploadTask | undefined;
  filePath = 'logos/';
  imageFile: any;
  uploadProgress: number | undefined;

  constructor(
    private store: Store<AppState>,
    private route: ActivatedRoute,
    private toastr: ToastrService,
    private router: Router,
    private themesService: ThemesService,
    private angularFireStorage: AngularFireStorage
  ) {
    this.isAdd = this.router.url === '/settings/themes/newtheme';

    this.isEdit = !this.isAdd;
  }
  ngOnInit(): void {
    if (this.isEdit) {
      const id = this.route.snapshot.paramMap.get('id');
      if (id == null) return;
      this.themeId = +id;
      this.themesService.getThemeById(+id).subscribe((result) => {
        this.imageSrc = result.logoUrl;
        this.themeForm.patchValue({
          id: result.id,
          primaryColor: result.primaryColor,
          accentColor: result.accentColor,
          logoUrl: result.logoUrl,
          active: result.active,
          textWhite: result.textWhite,
        });
        this.active = result.active;
      });
    }
  }
  onImageSelected(event: any) {
    const randomId = Math.random().toString(36).substring(2);
    this.filePath += randomId;
    this.ref = this.angularFireStorage.ref(this.filePath);
    const reader = new FileReader();
    reader.onload = (e) => (this.imageSrc = e.target?.result || '');
    reader.readAsDataURL(event.target.files[0]);
    this.imageFile = event.target.files[0];
    this.isImageChanged = true;
  }
  ngOnDestroy(): void {
    this.theme$.unsubscribe();
    this.postTheme$.unsubscribe();
    this.putTheme$.unsubscribe();
  }
  onSubmit(): void {
    this.isSubmitted = true;
    if (this.imageFile === undefined && this.isAdd) {
      this.toastr.error('Please select an image.');
      this.isSubmitted = false;
    } else {
      if (this.isImageChanged) {
        this.task = this.angularFireStorage.upload(
          this.filePath,
          this.imageFile
        );
        this.task.snapshotChanges().subscribe((result) => {
          this.ref?.getDownloadURL().subscribe((url) => {
            this.themeForm.patchValue({
              logoUrl: url,
            });
            if (url !== undefined) {
              this.submitData();
            }
          });
        });
        this.task
          .percentageChanges()
          .subscribe((p) => (this.uploadProgress = p));
      } else {
        this.submitData();
      }
    }
  }
  submitData(): void {
    this.isSubmitted = true;
    if (this.isAdd) {
      this.postTheme$ = this.themesService
        .postTheme(this.themeForm.value)
        .subscribe(
          (result) => {
            this.router.navigateByUrl('/settings/themes');
          },
          (error) => {
            this.toastr.error(
              'Please try again later...',
              'Something went wrong.'
            );
          }
        );
    }
    if (this.isEdit) {
      if (this.active) {
        this.store.dispatch(new ThemeActions.EditTheme(this.themeForm.value));
      }
      this.putTheme$ = this.themesService
        .putTheme(this.themeId, this.themeForm.value)
        .subscribe(
          (result) => {
            this.router.navigateByUrl('/settings/themes');
          },
          (error) => {
            this.toastr.error(
              'Please try again later...',
              'Something went wrong.'
            );

            this.isSubmitted = false;
          }
        );
    }
  }
}
