import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';

// components
import { HousingLocationComponent } from '../housing-location/housing-location.component';

// services
import { HousingService } from '../housing.service';

// interfaces
import { HousingLocation } from '../housinglocation';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, HousingLocationComponent],
  template: `
    <section>
      <form>
        <input type="text" placeholder="Filter by city" #filter />
        <button
          class="primary"
          type="button"
          (click)="filterResults(filter.value)"
        >
          Search
        </button>
      </form>
      <section class="results">
        <app-housing-location
          *ngFor="let housingLocation of filteredLocationList"
          [housingLocation]="housingLocation"
        />
      </section>
    </section>
  `,
  styleUrls: ['./home.component.css'],
})
export class HomeComponent {
  housingService: HousingService = inject(HousingService);

  // declarations
  housingLocationList: HousingLocation[] = [];
  filteredLocationList: HousingLocation[] = [];

  // acts like useEffect
  constructor() {
    this.housingService
      .getAllHousingLocations()
      .then((housingLocationList: HousingLocation[]) => {
        this.housingLocationList = housingLocationList;
        this.filteredLocationList = housingLocationList;
      });
  }

  filterResults(text: string) {
    console.log(text);
    if (!text) {
      this.filteredLocationList = this.housingLocationList;
    }

    this.filteredLocationList = this.housingLocationList.filter(({ city }) =>
      city?.toLowerCase().includes(text.toLowerCase())
    );
  }
}
