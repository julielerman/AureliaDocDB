import moment from 'moment';

// Always conventionally name classes in PascalCase
export class DateFormatValueConverter {
  toView(value) {
    return moment(value).format('M/D/YYYY');
  }
}
