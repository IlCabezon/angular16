import { Injectable } from '@angular/core';

// interfaces
import { HousingLocation } from './housinglocation';

@Injectable({
  providedIn: 'root',
})
export class HousingService {
  url = `http://${window.location.hostname}:3000/locations`;

  async getAllHousingLocations(): Promise<HousingLocation[]> {
    console.log(window.location);

    const data = await fetch(this.url);
    return (await data.json()) ?? [];
  }

  async getHousingLocationById(
    id: number
  ): Promise<HousingLocation | undefined> {
    const data = await fetch(`${this.url}/${id}`);
    return (await data.json()) ?? {};
  }

  submitApplication(props: {
    firsName: string;
    lastName: string;
    email: string;
  }) {
    console.log(
      `Homes application received the following data ${JSON.stringify(props)}`
    );
  }
}
