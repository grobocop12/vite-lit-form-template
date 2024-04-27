import { LitElement, html } from 'lit'
import { customElement, property } from 'lit/decorators.js'
import { getProperty } from './config.ts';
import { differenceInDays, parseDateString } from './utils.ts';


@customElement('my-app')
export class MyApp extends LitElement {
  @property({ type: String }) dateFrom: string | undefined;
  @property({ type: String }) dateTo: string | undefined;
  @property({ type: Boolean }) isSearchEnabled = false;

  render() {
    return html`
    <div>
      <div>
        <form @submit=${this.onSubmit}>
          <input type="date" .value=${this.dateFrom} @input=${this.onDateFromInput}>
          <input type="date" .value=${this.dateTo} @input=${this.onDateToInput}>
          <button type="submit" ?disabled=${!this.isSearchEnabled}>Search</button>
        </form>
      </div>
    </div>`
  }

  onDateFromInput(event: Event) {
    this.dateFrom = (event.target as HTMLInputElement).value;
    this.updateSearchEnabled();
  }

  onDateToInput(event: Event) {
    this.dateTo = (event.target as HTMLInputElement).value;
    this.updateSearchEnabled();
  }

  updateSearchEnabled() {
    if (this.dateFrom && this.dateTo) {
      this.isSearchEnabled = true;
    } else {
      this.isSearchEnabled = false;
    }
  }

  onSubmit(event: Event) {
    event.preventDefault();
    this.validateQueryAndSendIt(0);
  }

  validateQueryAndSendIt(pageNumber: number) {
    const dateFrom = parseDateString(this.dateFrom);
    const dateTo = parseDateString(this.dateTo);
    if (this.validateDates(dateFrom, dateTo)) {
      console.log("wysyłamy!")
    }
  }

  validateDates(dateFrom: Date | undefined, dateTo: Date | undefined): boolean {
    if (!dateFrom || !dateTo) {
      alert("Należy wybrać daty!");
      return false;
    } else if (dateFrom > dateTo) {
      alert("Data od musi być wcześniejsza niż data do!")
      return false;
    }
    const diff = differenceInDays(dateFrom, dateTo);
    if(diff > 31){
      alert("różnica w dniach nie może być dłuższa niż 31 dni");
      return false;
    }
    return true;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'my-app': MyApp
  }
}
