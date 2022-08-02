from pathlib import Path

import tablib
import pycountry


def strip_auxiliary_names(name: str):
    pos = name.find('(')
    if pos == -1:
        return name
    return name[:pos].strip()


def main():
    csv_path = Path(__file__).parent / 'countries-code.csv'
    new_data = tablib.Dataset()
    with csv_path.open() as f:
        data = tablib.import_set(f, 'csv', headers=False)
        for row in data:
            original_name = row[0].strip()
            print('Lookup', original_name)
            name_vi = strip_auxiliary_names(original_name)
            country = pycountry.countries.get(name=name_vi)
            if not country:
                country = pycountry.countries.get(common_name=name_vi)
            print(country)
            if not country:
                print(row)
                new_data.append(row + ('', ''))
                continue
            official_name = getattr(country, 'official_name', None) or getattr(country, 'name', None)
            new_row = row + (country.alpha_2, official_name)
            new_data.append(new_row)
    (csv_path.parent / 'iso_countries.csv').write_text(new_data.export('csv'))


if __name__ == '__main__':
    main()
