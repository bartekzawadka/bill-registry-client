import { Component } from '@angular/core';
import {Globals} from './globals';

declare let scanner;

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'app';

  constructor(public globals: Globals) {
    scanner.addInstallPromptDomElementIfNotExists = function(){
      return true;
    };
    scanner.displayInstallScanAppFunc = function() {};
    scanner.displayInstallScanAppEnableJavaPopup = function() {};

    scanner.failedToConnectToWebSocketServer = () => {
      this.globals.scanJsFailDetected = true;
    };
  }
}
