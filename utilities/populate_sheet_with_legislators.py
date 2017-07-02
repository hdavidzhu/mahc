import pandas as pd
from xls_io import XLSIO
from get_legislators_from_address import get_legislators_from_address

def populate_sheet_with_legislators(name, address_column_names):

    my_XLSIO = XLSIO(name)
    worksheet = my_XLSIO.load()

    # Combine columns into full address column
    worksheet['Combined address'] = ''
    for column_name in address_column_names:
        worksheet['Combined address'] = worksheet['Combined address'] \
            + worksheet[column_name].astype(str)

    # Get size of sheet
    ws_size = worksheet['Combined address'].shape[0]

    # Define columns to build from requested info
    senators_names = [None] * ws_size

    # Run each address and get legislators
    for index, row in worksheet.iterrows():
        legislators = get_legislators_from_address(row['Combined address'])

        # Skip if no legislators found
        if legislators == None:
            continue

        else:
            # Print some progress
            if index % 5 == 0:
                print("Done with %i rows" % index)

            # Extract senator names
            senators_names[index] = list(
                filter(lambda legislator: legislator['chamber'] == 'upper',
                    legislators))[0]['full_name']

    # Set extracted lists to new columns
    worksheet['Senator name'] = senators_names

    my_XLSIO.save()

if __name__ == "__main__":
    populate_sheet_with_legislators(
        name = '../files/renter_deduction_bill',
        address_column_names = ['Street address', 'City'])

    # populate_sheet_with_legislators(
    #     name = '../files/non_member',
    #     address_column_names = ['Street Address', 'Town', 'Zip'])
