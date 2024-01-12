import { defaultSocialAttackVectors } from '../../../../../../data';
import React from 'react';

interface SocialAttackVectorsProps {
  defaultSocialAttackVectors?: Record<string, 'enabled' | 'disabled'>;
}

const SocialAttackVectors: React.FC<SocialAttackVectorsProps> = (props) => {
  const attackVectors =
    props.defaultSocialAttackVectors || defaultSocialAttackVectors;

	

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
          {Object.keys(attackVectors).map((attack: string) => (
            <div className="filter" key={attack}>
              <div className="check">
                <input
                  type="checkbox"
                  checked={attackVectors[attack as keyof typeof attackVectors] === 'enabled'}
                  className=" checkbox-color"
									/* onChange={}  falta y hay que agregar esto*/
                />
                <span>{attack}</span>
              </div>
              <span>{attackVectors![attack as keyof typeof attackVectors]}</span>
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default SocialAttackVectors;
