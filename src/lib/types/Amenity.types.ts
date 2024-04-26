export interface IAcademics {
	name: string;
	lat: string;
	lng: string;
}

export interface IAdmin {
	name: string;
	func: string;
	room: string;
	mail: string;
	phone: string;
}

export interface IEssentials {
	name: string;
	lat: string;
	lng: string;
	'time.from': string;
	'time.to': string;
	mail: string;
	phone: string;
	MO: 'FALSE' | 'TRUE';
	TU: 'FALSE' | 'TRUE';
	WE: 'FALSE' | 'TRUE';
	TH: 'FALSE' | 'TRUE';
	FR: 'FALSE' | 'TRUE';
	SA: 'FALSE' | 'TRUE';
	SU: 'FALSE' | 'TRUE';
}

export interface IFood {
	name: string;
	lat: string;
	lng: string;
	'time.from': string;
	'time.to': string;
	mail: string;
	phone: string;
}

export interface IHostel {
	name: string;
	lat: string;
	lng: string;
	mail: string;
	phone: string;
	warden: string;
}

export interface ISport {
	name: string;
	lat: string;
	lng: string;
}
