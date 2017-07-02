import pandas as pd
from xls_io import XLSIO

def group_by_legislators(file_name):
    """
    Sorts an XLS document by legislators
    """

    # Load the data
    my_XLSIO = XLSIO(file_name)
    worksheet = my_XLSIO.load()

    # Sort the parsed results by legislators
    worksheet.sort_values(by = ['Senator name', 'City', 'Combined address'], \
        inplace = True)

    # Save
    my_XLSIO.save(extension = '.xls')

if __name__ == '__main__':
    group_by_legislators('../files/renter_deduction_bill_output')
