import React from 'react';
import {ComptUtils} from '../tools/util';

function Help({info}) {
    const longText = info.length > 200 ? 600 : 180;
    return <div className="help">
        < ul className="intro" style={{width: longText}}>
            {ComptUtils.generateToolArr(info).map((toolstr, index1) =>
                <li key={index1}>{toolstr}</li>
            )}
        </ul>
    </div>
};
export default Help;