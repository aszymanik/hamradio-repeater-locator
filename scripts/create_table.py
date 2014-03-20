from sqlalchemy import *

if __name__ == '__main__':
	db = create_engine('sqlite:///repeaters.db', echo=False)
	metadata = MetaData(db)

	repeaters = Table('repeaters', metadata, 
		Column('id', Integer, primary_key=True),
		Column('freq_out', Float),
		Column('freq_in', Float),
		Column('tone', Float),
		Column('location', String),
		Column('county', String), 
		Column('lat', Float),
		Column('lon', Float),
		Column('call', String),
		Column('use', String),
		Column('opstatus', String),
		)

	metadata.create_all()
