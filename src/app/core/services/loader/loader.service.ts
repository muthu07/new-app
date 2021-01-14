import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class LoaderService {
  isLoading = new Subject<boolean>();

  show(): void {
    // show loader while an API call is being done
    this.isLoading.next(true);
  }

  hide(): void {
    // hide loader on API call completion
    this.isLoading.next(false);
  }
}
