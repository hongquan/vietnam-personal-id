#! /usr/bin/env python

import json
from pathlib import Path
from traceback import print_tb

import click
import tablib
import pycountry


def strip_auxiliary_names(name: str):
    pos = name.find('(')
    if pos == -1:
        return name
    return name[:pos].strip()


@click.group
def cli():
    pass


@cli.command
def auto_fill_iso():
    csv_path = Path(__file__).parent / 'countries-code.csv'
    new_data = tablib.Dataset()
    with csv_path.open() as f:
        data = tablib.import_set(f, 'csv', headers=False)
    for row in data:
        original_name = row[0].strip()
        click.echo(f'Lookup {original_name}', err=True)
        name_vi = strip_auxiliary_names(original_name)
        country = pycountry.countries.get(name=name_vi)
        if not country:
            country = pycountry.countries.get(common_name=name_vi)
        click.echo(country, err=True)
        if not country:
            new_data.append(row + ('', ''))
            continue
        official_name = getattr(country, 'official_name', None) or getattr(country, 'name', None)
        new_row = row + (country.alpha_2, official_name)
        new_data.append(new_row)
    click.echo(new_data.export('csv'))


@cli.command
@click.argument('infile', type=click.Path(exists=True))
def gen_json(infile: str):
    """Generate JSON from CSV file INFILE"""
    csv_path = Path(infile)
    data = {}
    with csv_path.open() as f:
        csv_data = tablib.import_set(f, 'csv', headers=False)
    for row in csv_data:
        bca_code = row[1]
        data[bca_code] = {
            'iso': row[2],
            'official_name': row[3]
        }
    click.echo(json.dumps(data, indent=2))

if __name__ == '__main__':
    cli()
