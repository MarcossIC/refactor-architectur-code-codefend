import { defaultSocialAttackVectors } from 'app/data';
import React from 'react';

interface SocialAttackVectorsProps {
  defaultSocialAttackVectors?: Record<string, 'enabled' | 'disabled'>;
}

const SocialAttackVectors: React.FC<SocialAttackVectorsProps> = (props) => {
	return (
		<>
			<div className="card filtered">
				<div className="header">
					<div className="title">
						<div className="icon">{/* <FaSolidChartSimple /> */}</div>
						<span>ATTACK VECTORS</span>
					</div>
				</div>
				<div className="content filters">
					{Object.keys(defaultSocialAttackVectors).map(
						(attack: string) => (
							<div className="filter" key={attack}>
								<div className="check">
									<input
										type="checkbox"
										checked={
											props.defaultSocialAttackVectors![attack] ===
											'enabled'
										}
										className=" checkbox-color"
									/>
									<span>{attack}</span>
								</div>
								<span>{props.defaultSocialAttackVectors![attack]}</span>
							</div>
						),
					)}
				</div>
			</div>
		</>
	);
};

export default SocialAttackVectors;
