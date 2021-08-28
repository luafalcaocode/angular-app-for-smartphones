import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { IMAGE_EXTENSIONS } from '../../constants/extensions';

@Component({
  selector: 'attachment',
  templateUrl: './attachment.component.html',
  styleUrls: ['./attachment.component.scss']
})
export class AttachmentComponent implements OnInit {
  @Input() fieldId;
  @Output() fileSelectedEvent: EventEmitter<any> = new EventEmitter<any>();
  @Input() clear: boolean;

  files: any[];
  file: any;
  src: any;
  countFiles: number;

  constructor() {
    this.files = [];
    this.countFiles = 0;
  }

  ngOnInit(): void {

  }

  ngDoCheck() {
    if (this.clear && this.files.length > 0) {
      this.files = [];

      const field = (<HTMLInputElement>document.getElementById(this.fieldId));
      field.value = '';
    }
  }


  openFileBox(field: any) {
    field.click();
  }

  onSelectedFiles(input) {
    this.file = input.files[0];
    if (this.file) {
      if (this.checkForInvalidExtension(this.file)) {
        input.value = ''
        this.fileSelectedEvent.emit({ foiSelecionado: false, id: this.fieldId });
        return;
      }

      this.setImageFromFile(this.file);
      this.files.push(this.file);

      this.fileSelectedEvent.emit({ foiSelecionado: true, id: this.fieldId, file: this.file });
    }


  }

  checkForInvalidExtension(file) {
    const dotPosition = file.name.lastIndexOf('.');
    const extension = file.name.substring(dotPosition).toLowerCase();
    return (!IMAGE_EXTENSIONS.includes(extension))
  }

  setImageFromFile(file) {
    var fileReader = new FileReader();

    fileReader.onload = () => {
      this.src = fileReader.result;
    };

    fileReader.readAsDataURL(file);
  }
}
