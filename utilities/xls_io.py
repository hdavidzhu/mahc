import pandas as pd

class XLSIO(object):

    def __init__(self, file_name):
        self.file_name = file_name

    def load(self, file_name = None):
        if file_name is None:
            file_name = self.file_name

        # Load in spreadsheet
        workbook = pd.ExcelFile(file_name + '.xls')
        self.worksheet = workbook.parse(0)

        # Returns a reference of the worksheet. Make sure not to overwrite
        return self.worksheet

    def save(self, file_name = None, worksheet = None, extension = '_output.xls'):
        if file_name is None:
            file_name = self.file_name

        if worksheet is None:
            worksheet = self.worksheet

        # Populate columns and save
        writer = pd.ExcelWriter(file_name + extension)
        worksheet.to_excel(writer, 'Sheet1')
        writer.save()
