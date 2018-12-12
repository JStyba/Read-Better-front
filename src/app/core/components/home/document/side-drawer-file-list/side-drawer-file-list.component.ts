import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {FileUploadService} from '../../../../../services/file-upload-service';
import {ConfirmationDialogComponent} from '../../../../../services/confirmation-dialog/confirmation-dialog.component';
import {MatDialog, MatDialogConfig} from '@angular/material';
import {PDFProgressData} from 'pdfjs-dist';
import {NgxSpinnerService} from 'ngx-spinner';

@Component({
  selector: 'app-side-drower-file-list',
  templateUrl: './side-drawer-file-list.component.html',
  styleUrls: ['./side-drawer-file-list.component.css']
})
export class SideDrawerFileListComponent implements OnInit {
  sideDrawerFiles;
  listOfFilesInDropbox: any[];
  totalFileSize;
  @Input() pdfFileDrawer;
  listOfFoldersInDropbox = [];
  isDemo;
  @Output() pdfFileDownloaded: EventEmitter<any> = new EventEmitter<any>();
  constructor(private fus: FileUploadService, private spinner: NgxSpinnerService, private dialog: MatDialog) { }

  ngOnInit() {
    if (localStorage.getItem('username') === 'demo') {
      this.isDemo = true;
      localStorage.setItem('count', '0');
    }
  }
  listPdfFilesInDropbox() {
    this.totalFileSize = 0;
    this.listOfFoldersInDropbox = [];
    this.fus.listPdfFiles().then(data => {
      if (data !== null) {
        this.listOfFilesInDropbox = data[0];
        this.totalFileSize = this.fus.convertBytes(data[1], 2);
      } else {
        this.totalFileSize = 0;
      }
    });
  }
  async removeFile(l: any) {
    if (!this.isDemo) {
      await this.fus.deleteFile(l).then(data => {
        if (data) {
          this.listOfFilesInDropbox.splice(this.listOfFilesInDropbox.indexOf(l), 1);
          this.listPdfFilesInDropbox();
        }
      });
    } else {
      alert('Option not available in demo mode');
    }
  }
  openModal(l: any) {
    const dialogConfig = new MatDialogConfig();

    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    dialogConfig.data = {
      id: 1,
      title: 'Do you really want to delete the file?'
    };

    const dialogRef = this.dialog.open(ConfirmationDialogComponent, dialogConfig);

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.removeFile(l);
      }
    });
  }
  downloadFileFromDropbox(fileName: string) {
    this.fus.downloadFile(fileName).then(data => {
      this.pdfFileDrawer = data;
      this.pdfFileDownloaded.emit(this.pdfFileDrawer);
      localStorage.setItem('file', fileName);
      this.spinner.show();
    });
  }

}
