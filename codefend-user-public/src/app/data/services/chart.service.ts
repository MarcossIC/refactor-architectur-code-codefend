import { User } from '..';

/** Compute InternalNetwork OS And Count */
const computeInternalNetworkOSAndCount = (internalNetwork: any) => {
	if (!Array.isArray(internalNetwork) || internalNetwork.length === 0)
		return {};

	const metrics = internalNetwork.reduce((acc, item) => {
		const osType = item.device_os;
		const childs = item.childs;

		if (childs && childs.length !== 0) {
			childs.map((child: any) => {
				const childOsType = child.device_os;
				if (acc[childOsType]) {
					acc[childOsType] += 1;
				} else {
					acc[childOsType] = 1;
				}
			});
		}

		if (acc[osType]) {
			acc[osType] += 1;
		} else {
			acc[osType] = 1;
		}

		return acc;
	}, {});

	const total = Object.values(metrics).reduce(
		(acc: any, value) => value + acc,
		0,
	);
	return { total, ...metrics };
};

/** Compute Source Code metrics for source code screen */
const computeSourceCodeMetrics = (source: any) => {
	if (!Array.isArray(source) || source.length === 0) return {};

	const metrics = source.reduce((acc: any, metric: any) => {
		const code = metric.sourceCode;
		if (acc[code]) {
			acc[code] += 1;
		} else {
			acc[code] = 1;
		}

		return acc;
	}, {});

	const total = Object.values(metrics).reduce(
		(acc: any, value) => value + acc,
		0,
	);
	return { total, ...metrics };
};

/** verify if auth User Chat */
const isUserChat = (id: any, user: User) => {
	if (!id) return false;
	const userId = user.id;
	// console.log({ userId, id });
	return userId == id;
};

/** compute social roles */
const computedRoles = (socials: any) => {
	if (!socials) return {};
	return socials.reduce((acc: any, social: any) => {
		if (acc[social.member_role]) {
			acc[social.member_role]++;
		} else {
			acc[social.member_role] = 1;
		}

		return acc;
	}, {});
};

const renderPercentage = (value: string, total: string) => {
	if (value === '0') {
		return '0%';
	}
	let percentValue =
		((parseInt(value) / parseInt(total)) * 100).toFixed() + '%';

	return percentValue;
};

export const ChartService = {
	isUserChat,
	computedRoles,
	computeSourceCodeMetrics,
	computeInternalNetworkOSAndCount,
	renderPercentage,
};
