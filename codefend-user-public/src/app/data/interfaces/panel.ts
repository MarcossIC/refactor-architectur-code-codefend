import { ID, Monitoring, ResourceID } from '.';

export interface Company extends ID, Monitoring {
	name: string;
	web: string;
	country: string;
	size: string;
	market: string;
	countryCode: string;
	countryProvince: string;
	countryCity: string;
	address: string;

	ownerName: string;
	ownerLastname: string;
	ownerRole: string;
	ownerEmail: string;
	ownerPhone: string;
	profileMedia: string;
	orderSize: string;
}

export interface Resouce extends ResourceID, Monitoring {
	resourceDomain: string;
	resourceDomainDad: string;
	servers: string;
	mainServer: string;
	serverCountry: string;
	serverCountryCode: string;
	serverCountryProvince: string;
	serverCountryCity: string;
}

export interface Webresources extends Resouce {
	childs: Resouce[];
}

export interface CompanyResource {
	web: string | number;
	mobile: string | number;
	cloud: string | number;
	lan: string | number;
	source: string | number;
	social: string | number;
}
export interface IssuesShare {
	total: string | number;
	critical: string | number;
	elevated: string | number;
	medium: string | number;
	low: string | number;
	intel: string | number;
}
export interface IssuesCondition {
	total: string | number;
	fixed: string | number;
	open: string | number;
}

export interface CompanyMember extends ResourceID, Monitoring {
	name: string;
	lastName: string;
	companyRole: string;
	email: string;
	phone: string;
	profileMedia: string;
	country: string;
	countryCode: string;
	countryProvince: string;
	countryCity: string;
}

export interface Issues extends ResourceID, Monitoring {
	resourceClass: string;
	resourceID: string;
	researcherID: string;
	researcherUsername: string;
	riskLevel: string;
	riskScore: string;
	name: string;
	condition: string;
	price: string;
	pricePaid: string;
}
export interface CompleteIssue extends Issues {
	content: string;
	cs: null | any[];
}

export interface DashboardProps {
	company: Company;
	issues: Issues[];
	members: CompanyMember[];
	resources: CompanyResource;
	issuesShare: IssuesShare;
	issuesCondition: IssuesCondition;
}

export interface WebapplicationProps {
	company: Company;
	resources: Webresources[];
}

export interface MobileApp extends ResourceID, Monitoring {
	appOS: string;
	appName: string;
	appLink: string;
	appAppleSubheader: string;
	appDeveloper: string;
	appDesc: string;
	appRank: string;
	appReviews: string;
	appAndroidDownloads: string;
	appMedia: string;
}

export interface MobileUnique extends MobileApp {
	creds: {} | null;
	issues: Issues;
	issueShare: IssuesShare;
	issueCondition: IssuesCondition;
}

export interface MobileProps {
	error: string;
	available: MobileApp[];
}

export interface CloudApp extends ResourceID, Monitoring {
	appName: string;
	appDesc: string;
	cloudProvider: string;
	cloudFirstKey: string;
	cloudSecondKey: string;
	cloudThirdKey: string;
	appMedia: string;
}
export interface IssueClass {
	total: string;
	web: string;
	mobile: string;
	infra: string;
	source: string;
	social: string;
	research: string;
}

export interface AllIssues {
	issues: Issues[];
	issueClass: IssueClass;
	issueShare: IssuesShare;
	issueCondition: IssuesCondition;
}

export interface SourceCode extends ResourceID, Monitoring {
	name: string;
	accessLink: string;
	isPublic: string;
	sourceCode: string;
}

export enum ChartValueType {
	SOURCE_CODE,
	PLAIN,
	NETWORK_OS,
}

export interface Network extends ResourceID, Monitoring {
	device_in_address: string;
	device_ex_address: string;
	device_os: string;
	device_vendor: string;
	device_name: string;
	childs?: Network[];
}

export enum ChatBoxType {
	ISSUE,
	SUPPORT,
}

export interface Device {
	id: string;
	company_id: string;
	device_in_address: string;
	access_username: string;
	access_password: string;
	creacion: string;
	device_ex_address: string;
	device_name: string;
	device_os: string;
	device_vendor: string;
	device_version: string;
	eliminado: string;
	pem: string;
	ppk: string;
	resource_lan_dad: string;
	childs?: Device[] | null;
}

export interface DeviceListResponse {
	disponibles: Device[];
	eliminados: null | any;
	error: string;
	info: string;
}

export interface OneIssue {
	company: Company | null;
	issue: CompleteIssue | null;
}

/* 
"session": "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJ1c2VyaWQiOiIxMDkiLCJleHAiOjE3MDU2MjUyNTd9.HivlkCsh5vAtxgWis5yA7B0rxmF14utrN13OaemyRlw",
    "user": {
        "id": "109",
        "company_id": "1",
        "fname": "Marcos",
        "lname": "Lopez",
        "username": "marcosIC",
        "role": "Web Developers",
        "access_role": "user",
        "email": "lopezikaro16@gmail.com",
        "phone": "3757588790",
        "password": "ad2671d23541251a1ecf8a06d2f8f386b8cfd07e62007349d20920fb6c50413f",
        "mfa_llave": "disabled",
        "profile_media": "",
        "pais": "Argentina",
        "pais_code": "AR",
        "pais_provincia": "Buenos Aires",
        "pais_ciudad": "Florentino Ameghino",
        "eliminado": "0",
        "creacion": "2023-12-28 19:34:38"
    },

    "issue": {
        "id": "130",
        "company_id": "1",
        "resource_class": "web",
        "resource_id": "0",
        "researcher_id": "21",
        "researcher_username": "hemsleek",
        "risk_level": "critical",
        "risk_score": "5",
        "name": "",
        "issue": "<p>A critical web issue<\/p>\n<p>&nbsp;<\/p>\n<p><img src=\"data:image\/png;base64,iVBORw0KGgoAAAANSUhEUgAAAXsAAAE9CAYAAADqP8J6AAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAAJcEhZcwAADsMAAA7DAcdvqGQAAB2SSURBVHhe7dwNkFXlnefxX4OgwLZBSERpIC0TkbSkxW3ZEImMLjvEEcuXXd\/HQY1lGKMJRcVkh0g0MRizGVOMtToJuoxCzUqCJOLsaM3ENVi+ZEmwE+0Ik+ALHbBRNBiKLkB5632ec89z+\/Tpc+89957TTcPz\/VSd+t\/zcv\/9P5fuX58+fem69aec0tUlqc4sSTUPqfvbSerMnmqqfZpZ6sx6l1k3W0v3r1G0X6b+Jc4jmLtEzYPtksv8cWnmN9UdF9Qa2Gf1yfwxqeaP1yrYo93cruapV\/8088drGXavOar\/5jdLD2nmj9cIu2a2lu6fUdX908wfqcHnpX2aWVytRt2vTNiHj6tW\/KIwj4MPXmLIHtWJryewe81RNZ9cJRX7u7mdpPOJ1wi7Zp8drXlK6l\/246SZP1J7fHLF1vMQ9C1RU3HzOknzx6s9rHB0ZrZPfO5M\/dPMH9bicU58PQV7dHxuV3Ph5gyVPY8a5o+zz+6T8wilmj9enfh6ArvXHNVn89etnzixyw0XnITZ2FcfNKlvVf2jL2JCTfrHqKp\/BbaP6xeveUicP6zmgT2gd62CPTo+t6t56NU3Mn\/F83C1DLs36FumZlGxf5r54zXCrpmtZWsWVfdPM3+kBv+O9mlmKVXzVHX\/CvPHa9L55Cnat6b+aeaP1XLKX9m75qGk5r2+iJ34egr2aPvRkmoeevV180fWi3OXqmXYvUGfMjWLiv3TzB+vjlkPXg\/z0G4tVbMo1zexv5vTSZo\/Ugfc\/HFp5o9X+zSzFL\/OMgj6VKhVCecucuthTTqfPNlumeaPSzN\/ZH9Qnfh6CvZoN7ereSrObR7b\/iXv2echqW\/Z\/tEXMUUNTsY+zSzxmoekvpn6J81fohaPy8A+u0\/mD6WaP16rYI9288ZrHnr1TTN\/vJZh95qjytYsKvZPM3+8Rtg1s7VszVPF\/mnmj9cIu2a2lu6fUdX908wfqcHnp32aWVytRj737CM1acgetQr2aHdSruapYv805xOvEXbNbC3dP6Oq+6eZP1KzfnJVEu1bU\/8088dqnmy3TPPHpZk\/sj+oGdhn5zp\/XGzeI\/18Us0fr1WwR7u5Xc1TxXv2eYr2ral\/0osZqT3mD9fzFPSN1Uzc\/KHoJ5F3Xwzx9QR2rzmq7+Y3S4\/+bk4naf54LcPutd2iNU8V+6eZP14dsx78u5qHdmu85impf+LHcXM6SfPHqz3MLMXPU7ce1jxE+1XVv9zckRr9+nJ9i19vZVR1Zd\/jg5So5kHP4apgjy4OX6JmUbF\/0vylzifh\/Oya2Vq2ZlGxv5vTSZq\/UrVPM4tZS6x5qLl\/NfOb9eDz0q2HNQ\/RflX1d3M6SfO7uUvUPNgu8bldzSSc39Wy87vjMrDP7pP5Q4nzu7lL1SrYo+1Hi9Y8xfvzPvsUov0y9S9xHkmfVMVPrhzYLrnMH5dmflPdcUGtgX1Wn8wfk2r+eK2CPdrN7WqeevVPM3+8lmH3mqP6b36z9JBm\/niNsGtma+n+GVXdP838kRp8XtqnmcXVavA++1jtwc3tJJ1PvEbYNfvsaM1TUv+yHyfN\/JHa45Mrtp6HoG+Jmoqb10maP17tYYWjM7N94nNn6p9m\/rAWj3Pi6ynYo+Nzu5oLN2eo7HnUMH+cfXafnEco1fzx6sTXE9i95qg+m5\/32VfB9nH94jUPifOH1TywB\/SuVbBHx+d2NQ+9+kbmr3gerpZh9wZ9y9QsKvZPM3+8Rtg1s7VszaLq\/mnmj9Tg39E+zSylap6q7l9h\/nhNOp88RfvW1D\/N\/LFaDu+zt\/NH1otzl6pl2L1BnzI1i4r908wfr45ZD14P89BuLVWzKNc3sb+b00maP1IH3PxxaeaPV\/s0sxS\/zjII+lSoVQnnLnLrYU06nzzZbpnmj0szf2R\/UJ34egr2aDe3q3kqzm0e2\/68z76MpL6Z+ifNX6IWj8vAPrtP5g+lmj9eq2CPdvPGax569U0zf7yWYfeao8rWLCr2TzN\/vEbYNbO1bM1Txf5p5o\/XCLtmtpbun1HV\/dPMH6nB56d9mllcrQbvs4\/VHtKcT7xG2DWztXT\/jKrun2b+SM36yVVJtG9N\/dPMH6t5st0yzR+XZv7I\/qBmYJ+d6\/xxsXmP9PNJNX+8VsEe7eZ2NU+8z74KQd9YzcTNH4p+Enn3xRBfT2D3mqP6bn6z9Ojv5nSS5o\/XMuxe2y1a81Sxf5r549Ux68G\/q3lot8ZrnpL6J34cN6eTNH+82sPMUvw8dethzUO0X1X9y80dqdGvL9e3+PVWBu+zj9ak+UudT8L52TWztWzNomJ\/N6eTNH+lap9mFrOWWPNQc\/9q5jfrweelWw9rHqL9qurv5nSS5ndzl6h5sF3ic7uaSTi\/q2Xnd8dlYJ\/dJ\/OHEud3c5eqVbBH248WrXmK9+d99ilE+2XqX+I8kj6pip9cObBdcpk\/Ls38prrjgloD+6w+mT8m1fzxWgV7tJvb1Tz16p9m\/ngtw+41R\/Xf\/GbpIc388Rph18zW0v0zqrp\/mvkjNfi8tE8zi6vV4H32sdqDm9tJOp94jbBr9tnRmqek\/mU\/Tpr5I7XHJ1dsPQ9B3xI1FTevkzR\/vNrDCkdnZvvE587UP838YS0e58TXU7BHx+d2NRduzlDZ86hh\/jj77D45j1Cq+ePVia8nsHvNUX02P++zr4Lt4\/rFax4S5w+reWAP6F2rYI+Oz+1qHnr1jcxf8TxcLcPuDfqWqVlU7J9m\/niNsGtma9maRdX908wfqcG\/o32aWUrVPFXdv8L88Zp0PnmK9q2pf5r5Y7Uc3mdv54+sF+cuVcuwe4M+ZWoWFfunmT9eHbMevB7mod1aqmZRrm9ifzenkzR\/pA64+ePSzB+v9mlmKX6dZRD0qVCrEs5d5NbDmnQ+ebLdMs0fl2b+yP6gOvH1FOzRbm5X81Sc2zy2\/XmffRlJfTP1T5q\/RC0el4F9dp\/MH0o1f7xWwR7t5o3XPPTqm2b+eC3D7jVHla1ZVOyfZv54jbBrZmvZmqeK\/dPMH68Rds1sLd0\/o6r7p5k\/UoPPT\/s0s7hajTrToNrnAACOMIPCCgA4ihH2AOABwh4APEDYA4AHCHsA8ABhDwAeIOwBwAOEPQB4oK6jo4P\/VIXDYuzYseGj8rZt2xY+AlAr\/gdtjWwANTQ0hGsDj\/kmrpNvvjlcG3je\/sEPqgr7UaNGhWsAasFtHADwAGEPAB4g7AHAA4Q9AHiAsAcADxD2AOABwh4APEDYA4AHCHsA8ABhDwAeIOwBwAOEPQB4gD+EViP+EFo2h\/sPoQ1+9lkdY2ZIo+tjH9PBc8\/VwcsuC7cARx6u7OGlwatXh48qq3vvveCbA3Ak48q+RlzZZ3O4r+yPvfLK8FF6H\/74x+GjKh3aodafrNCT69u140NpyIgGfXL2Fbrm3EYN0zv62Xfu0ZPbT9Kcry\/U7DGFp7Q9PF\/LXpaab7xPNzZL+99r1erlj6u1o1P7D5keo5o0+5prNPvU3eHzC8\/rZcwcLfz6bJ10qFObnn5UP3pmYzCDjh2tpllzNfdzdgZj+890z3eeNNNIJ12wUAs\/d5LdWrBzrb535xp1mIeFfSr5Me2801oLsxcNGqL6hhZd+vmr1ZL0z7jfvD6PLdPjL3eoszjbVbrmLyap\/tVlmr+sTZp6o+67wbwQlpvVnVtbeEyEfY1bLrtRV\/\/H0T3OrSh+\/kbhNX5MrVv3ar+GaNj4Fl0emdn9mxRFz+ut3jNEuX\/Hw4kre6BP7VXb8r\/TihfatcsEdMu0Fp36H95V2+NL9D+f7hE\/pX3Yqn\/8zgqtM2nbMKXF9GjS6M6NevL+JVrTPkLjmu02uzTKRJsxWo3Bulmax2mEia6Nj96tB57aqF0j7QzNahy2SxufWqJv\/XhT8Iyod9atC4LdeeeXPde7RT5OuEw6IdxlIrQwq1kmj9YHW9dpxb2r1R7u7bZfrY\/cpRW\/NB\/h5Obg+KaRdrYHtOSJ3keXM6yh8PoGr8++Dq1bfpeWrt8f7jVGNYb7zfkP3RGc\/989EZ6Z+YawJHiNj1GDfT2bRutAh5n520v0\/M7CIQUlzuuESWFvM3\/DsMKRxXmir8vhQ9gDfanj37Tm5b3S+Et059\/O09xr52re335e000edDyzVr2jNsEbm\/SauZrXlEu14EZzNXrtPN12TYvqR+5Tx5Z9arrQbrPLLBV+1mzQrGDdLBc2qX77Wj2x3sww6jzdGsxwoxbceavOM1ese3+xRmsjYVY\/yny7eL9N64vpbkJznfmmNGxY8Qq4W+TjhMs548Nd+oimXhRun3erLp5oNu1+TZt6\/TRgtv3e1mZdOv\/G4Ph5XzFXyiPrte\/trdoRHJPOR864OJxjnhZ+8RzVm20bX\/33wk5rwqxwvzn\/26\/WJLNpx4YNwRV\/21NPqsO8xk1X3V54ject1LevajI\/lbXrSfNNsluJ8xp6Tth7ri4+4yOFI4vzRF+Xw4ewH4DuvPNObd68OaiHzYknmnCZkrwgtf1vbQ8C66RPfTIIn8CgJl32jcVafPuFGh+58Czpz85Q8whT21Zq0X2rtfb3Jp6mztXiby3WLTML1\/Ll7G\/fHATa6GnT1ei+4gc1amqznahDb24pbLI6JzSqedAOrXsh\/DbUsV5t75sQ\/Mx0E3Nxu7Tp161qdUt7Z7g9pnOTNr1t6qBRGj2ysKnbqTpjqv020qaV31qi1c9uMrO2aK45t8UmsCufXZL92tG+VcE0Q44JtsR1vrG58I3E7B5ift54M\/ghollnTev+ljZs6hkyca+97W\/1vAXklD2vgYewH2DWrl2rb37zm2psbAzq4Qj8urvvVt1DDxVq0mL2Bd8MUNGOnSYpEwwZUa\/6+noNGxJuKOfYJs1deIvmNB2nD958Xmv+4R7d9rVFWvpcYgT14mYYMjgoRccNt99BpHffjvY5XZ8xgbf3N63aaK5023\/1knYMatZnxu9ICLx2Pb98hVa4Ze3mcLv1jp78znzNn2+WRSvUtneYJl16sVqODXcXDVHTNbfrlguadNxu0+\/xB3TP127ToqXP6x3700wV3nnqnsLHm3+b7rK3gIY0aM4sG9ehl5eF++dr0UPrzHnVq+V8+w1ll3mNCocMiSbiscPt9wJp+1a9G2yw0p7XwEPYDyDXX3+9brjhhnCtwG7rV+EVfddNNwWrXRdf3L3cfnth2zPPBKFP4Fc2emTyL5b37+5UZ6f9RWBK9ZM0e95i3fu9O7TgynPUMLRTG3\/y91oZ3AIpz82w\/2BQij7YszuoJ54c+WWsDd+WMzRs7yt6ZeNG\/b9fdmrYtM+oOfECuUlXLzZX4G656pPhdiu8t93cULj903SJPj8z+nEiTOhO+tw8Lf7evbpjwdU6Z\/wx6ty4Wn\/\/WKqbXEXd98jP0yU3LdDie76m2SeHO63iPftzNOfKW7Twu4s1t9lOd3zxytz+8rvowz06YOuY8er+TK\/ivAYYwn6AsFf0Dz\/8sK677jqdcsop4Vbp2f5+y1+lAH\/XXOP8\/OfdgY+yhowbE9yKeOe3\/164rWAd2qjV316kRXev0WadpNHBO3B2a1che4392rPP1mEabq4Ydzz3gBbduUgrfm2+NRw7Wo1nX6YFlwY3GNTeXvnqfkjjKeajmD7r16ndhdmhdr3cZidq0MQJhU1Fp83U9FF7te7RFXrFXLme0RK5Ou7hGA03P53Yn1CCpcePKeG97Rtv1hx7X3vjGq1J+sb03vN6wJzbouWt2j9oiEY3Ttdl8y8v3D55o13vfMy8Pva43XvM2Yb27jGvljFimAo\/mxR03yO\/ROdNaVR9\/Kem4j37yzT77Ek6qXg13qiJjba26SX7u43Q3pdfkb1bP6xxXPD6FaQ8rwGIsB8AbNDb2zb2qt7eunGBb4M+fqXf3+qeeKJ7seFuwz4M\/OAbwxF6dX+oqVSAJav2+KKGz+kSe0966xr9jyXLtOKflmnJt\/5R60ymNJx3XvBLwuZPt5hY79Tz\/3CPlv7TCq1Yeq9W25QZcYZaTjVX5qedquN3dar10XsL+02P+58IYshclae4qz3mPF1s70W\/v1b3f3epef4KLf3u\/Vr7vulwtgnGXvebGzRtqum7e6\/2jpqumaeFm3vp0DPBPN3L81vDXUX1Ouf86WZS883j\/6zt\/obnfOxUnTrC\/JTz65W6d2mhx7L7Hy+ErPmJY\/TJLZpuf+v82krd7V6\/\/1Xo03jm1O7fg2TUfMEcNZg03Piju7VkmZlj2RLd\/SMzxaBGzbkg6d++wnkNQIT9YRYNehvylg38c889V+eZMDhsTKDbWzn21k2P5b77ivuPZAe++EUduPlmHbj88mCJsv9j1m13y\/6af3cyTM3XfVVzP92gAx1tal3fpo79J6r50gX6Uvhe9iFT5uqr101Xg3074PpWtf5uh45vmqNbFl6tSfYrdMxsLfi6fUfHfr3WavbbHocaNP1a07c5zU3\/7vvix+\/caJ7fqo07j1fTBQt055X2201vDX9+TvDOntFTpwU12Q6123kjy6Y\/hbuiTruwcBW89d+0qi1+4+okzV5wh+Z+tkH73yj0aOs4oIZPm9fk2mYzudn\/pQWa0zRaH2wJX7\/g3O\/QrTPzinojfI2nNxxQR5uZo61DBxqma+43FuicUr98LXteAw\/\/qapGefynqmjQ21\/E2oC37BV91qCv+T9VTZkSXMHbe\/RF9ur9U5+SfvvbHiFvr\/aDe\/s1BP\/h\/k9Vce4\/Wdlg588i4GjElf1hYoPehntfBH3egnfgfPnLR\/U9enubxl69E\/Q4WhH2h4EL+vb29uCXsgM56Hvclz9C78+nYYO+5vvywBGAsO9n9raNDXcb6vaxXawBGfSWvXdv33L56quFCuCIRNj3Mxv0jzzySI9wH7BX9I4LelOLjuKrfOBoxC9oa1TrL2jtLRzLXdX3VdBn+auX9v68Zs0K18rIcLU\/0H5BCxztCPsa1Rr27h69vbpfvnx5cN++L2T+E8eVrtwzvvWSsAf6F2Ffo1rDvr\/w9+wBRHHPHgA8QNgDgAcIewDwAGEPAB4g7AHAA4Q9AHiAsAcAD\/A++xrxPvtsqn2fPYBsCPsaEfbZVBv2aY8FkIzbOADgAcIeADxA2AOABwh7APAAYQ8AHiDsAcADhD0AeICwBwAP1HV0dPCfqnBY8J+qgP7D\/6CtEQGUTTWvH681kB23cQDAA4Q9AHiAsAcADxD2AOABwh4APEDYA4AHCHsA8ABhDwAeIOwBwAOEPQB4gLAHAA8Q9gDgAcIeADxA2AOAB+oOXXRR+CeOJ0sP\/ZV00zek0+ZJ37tAdXbzu0+p66alZvuDqrtwjLT7TXX98PvSurekfUOlpguk225Q3eigSWWHdmrD0z\/Tuq07dfCQNHjkBE3\/L+fr9FF25x\/14sqfakNncGTBkJGa8OnZOr9ppPTei1r5+AZFd1v1U\/6rrh61Tg8+t02Dx83UX18wWWay4vGy+8\/+aHBsXvizu9nwJ46B\/jVIs2+VFt1hFhP0x4dbS\/qTur7\/36XndkvXfEX68sXS9jXSV5eq64PwkLJ2av1PV+nFP+xR\/cQzNW3KWA3ftUUv\/vO\/6vV94SHWcWN15tkzNOPsMzVh6E5teeEn+pffdR8wdNyZZp\/dX1imfaJ78INvvRR8HwIAdBukjzerblqLWUw9Ltxa0lap1YTuaVdIl85U3axrpataTPq2SX+Quh69Xl1Xflddu8LD47a16ffvm6v5xs\/qiv88zQT6hfpvnx2rwfu2aP1LfwwPMoacoFOmnK7Tp0zT+X9xuobroLb9YUu4Uzp25Clmn91fWD5xYnAdH9qj372wzvyMAABwqrxnP1k61wTr7x+Wlj2trrf3qW72Har74QOqO83sPmGidOqfmfAvHB23c2uHiWJpzIRPFDYYQydOkL3B0vn+9sKGmM53\/6QPTR0+bHhhg\/Hhzs3a8OqGwvLadkV\/KPjoiWOkXW168RX7kQAAVpVhP1R1X14izR4n\/fP90t9crq5bvq+u8LZJ3V+a4F98ecmfEA4cDB9EDR2qwbZ27uy+Gu\/coJ8++KAeNMvKX2zTweMm6Kyzuu\/Z7nvrN3rxFy8WlpdeV\/QHiaGTZ6j5eGn7b57T6\/a7BACghnfjDB6nuluWqO6xR6SvXCL98TlpgQn8FPfsjwlSPWbfPgXfA+pHBlf4geI9+xma+ZdX6Pprz9fk7gv74BeyX\/jCFwrL1TO6nxf4qKZ\/drKG79uidS\/9sdAbADwXC\/uhhV\/SmgAu+lPk9srbT6nrb76grn8xl\/JDT1DdzBukv5pojl8nvRYeU8bI8Q2ymb19y+uFDdaW7cEVff2oMYV1q3jP\/nRNHj9SQ6v9ljRuus4aN1h73t0e3DYCAN\/FYnSyNOsEafP\/lh56Wl3rzfKDpwrb\/5MJ4xObTRCb8F9uruSfaVXXc2ukNW+a4G+RPi51\/ewudS16rPRV\/tiz1HyidLD9Ba36+Xpt+NW\/auWzm3VwqLmSn5r+rZE97tmb5fV3o3ftraGafO40jan+5xYAOCr1isO6v14iXWTC\/f\/eLy02y\/5PSffcoToT0sEtnLvN\/ukmXH94l\/R9801hxEyz\/0uqsz8RbDPB\/9ob5ko\/aJVguJovukIzPj5cnW\/+Ri++vEV7jp+gGRdd2OM2TSU97tmbZf3rCW\/\/Gd6sGU314QoA+K2uywgfowr8R59s+E9VQP\/iRgcAeICwBwAPEPYA4AHCHgA8QNgDgAcIewDwAGEPAB4g7AHAA4Q9AHiAsAcADxD2AOABwh4APEDYA4AHCHsA8EBdR0cHf+IYhwV\/4hjoP\/w9exwW\/D17oH9xGwcAPEDYA4AHCHsA8ABhDwAeIOwBwAOEPQB4gLAHAA8Q9gDgAcIeADxA2AOABwh7APAAYQ8AHiDsAcADhD0AeICwBwAPEPYA4AHCHgA8QNgDgAcIewDwAGEPAB4g7AHAA4Q9AHiAsAcADxD2AOABwh4APEDYA4AHCHsA8ABhDwAeIOwBwAOEPQB4gLAHAA8Q9gDgAcIeADxA2AOABwh7APAAYQ8AHiDsAcADdatWreoKHwP9ZsaMGRo7dmy4Vt62bdtSHwsgWV2XET4G+k01AU7YA9lxGwcAPEDYA4AHCHsA8ABhDwAeIOwBwAOEPQB4gLAHAA8Q9gDgAcIeADxA2AOABwh7APAAYQ8AHiDsAcADhD0AeICwBwAPEPYA4AHCHgA8QNgDgAcIewDwAGEPAB4g7AHAA4Q9AHiAsAcADxD2AOABwh4APEDYA4AHCHsA8ABhDwAeIOwBwAOEPQB4gLAHAA8Q9gDgAcIeADxA2AOABwh7APAAYQ8AHiDsAcADdatWreoKHwP9ZsaMGRo7dmy4Vt62bdtSHwsgWV2XET4G+k01AU7YA9lxGwcAPEDYA4AHCHsA8ABhDwAeIOwBwAOEPQB4gLAHAA8Q9gDgAcIeADxA2AOABwh7APAAYQ8AHiDsAcADhD0AeICwBwAPEPYA4AHCHgA8QNgDgAcIewDwAGEPAB4g7AHAA4Q9AHiAsAcADxD2AOABwh4APEDYA4AHCHsA8ABhDwAeIOwBwAOEPQB4gLAHAA8Q9gDgAcIeADxA2AOABwh7APAAYQ8AHiDsAcADhD0AeICwBwAPEPYA4AHCHgA8QNgDgAcIewDwAGEPAB4g7AHAA4Q9AHiAsAcADxD2AOABwh4APEDYA4AHCHsA8ABhDwAeIOwBwAOEPQB4gLAHAA8Q9gDgAcIeADxA2AOABwh7APAAYQ8AHiDsAcADhD0AeICwBwAPEPYA4AHCHgA8QNgDgAcIewDwAGEPAB4g7AHAA4Q9AHiAsAcADxD2AOABwh4APEDYA4AHCHsA8ABhDwAeIOwBwAOEPQB4gLAHAA8Q9gDgAcIeADxA2AOABwh7APAAYQ8AHiDsAcADhD0AeICwBwAPEPYA4AHCHgA8QNgDgAcIewDwAGEPAB4g7AHAA4Q9AHiAsAcADxD2AOABwh4APEDYA4AHCHsA8ABhDwAeIOwBwAOEPQB4gLAHAA8Q9gDgAcIeADxA2AOABwh7APAAYQ8AHiDsAcADhD0AeICwBwAPEPYA4AHCHgA8QNgDgAcIewDwAGEPAB4g7AHgqCf9fx1zquLdQfSAAAAAAElFTkSuQmCC\"><\/p>",
        "condicion": "open",
        "price": "",
        "price_paid": "",
        "eliminado": "0",
        "creacion": "2024-01-04 12:18:54",
        "cs": null
    }
*/
