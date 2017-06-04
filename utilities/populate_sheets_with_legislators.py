import pandas as pd
from get_legislators_from_address import get_legislators_from_address

# Load in spreadsheet
workbook = pd.ExcelFile("../files/renter_deduction_bill.xls")
worksheet = workbook.parse(0)

# Combine columns into full address column
worksheet['Combined address'] = worksheet['Street address'] + worksheet['City']
ws_size = worksheet['Combined address'].shape[0]

# Run each address and get legislators
senators_names = [None] * ws_size
for index, row in worksheet.iterrows():
    legislators = get_legislators_from_address(row['Combined address'])
    if legislators == None:
        continue
    else:
        # TODO: Figure out what info to best use
        senators_names[index] = list(filter(lambda legislator: legislator['chamber'] == 'upper', legislators))[0]['full_name']

worksheet['Senator name'] = senators_names

print(worksheet['Combined address'])
print(worksheet['Senator name'])

# Populate columns and save
writer = pd.ExcelWriter('../files/renter_deduction_bill_output.xls')
worksheet.to_excel(writer, 'Sheet1')
writer.save()
