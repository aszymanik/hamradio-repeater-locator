from sqlalchemy import *
import csv
import sys

def main(repeaters):
	columns = ['freq_out', 'freq_in', 'offset', 'tone', 'tsq', 'location', 'county', 'lat', 'lon', 'call', 'use', 'opstatus', 'mode', 'echolink', 'irlp', 'allstar', 'coverage', 'last_update']
	with open(sys.argv[1], 'rb') as sfile:
		next(sfile)
		rows = csv.DictReader(sfile, fieldnames=columns, delimiter=",")
		marshalled_rows = []
		for row in rows:
			try:			
				row['freq_out']	= float(row['freq_out'])
				row['freq_in'] 	= float(row['freq_in'])
				row['tone']		= -1 if row['tone'] in ['ATV', ''] else float(row['tone'])
				row['lat'] 		= float(row['lat'])
				row['lon'] 		= float(row['lon'] )
				marshalled_rows.append(row)
			except:
				print "Bad entry: ", row

		repeaters.insert().execute(marshalled_rows)
			

if __name__ == '__main__':
	db = create_engine('sqlite:///repeaters.db', echo=False)
	metadata = MetaData(db)

	repeaters = Table('repeaters', metadata, autoload=True)

	main(repeaters)