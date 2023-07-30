import React from 'react';
import loading1 from './loading/loading1.gif';
import loading2 from './loading/loading2.gif';
import loading3 from './loading/loading3.gif';
import loading4 from './loading/loading4.gif';
import loading5 from './loading/loading5.gif';
import loading6 from './loading/loading6.gif';
import loading7 from './loading/loading7.gif';
import loading8 from './loading/loading8.gif';
import loading9 from './loading/loading9.gif';
import loading10 from './loading/loading10.gif';
import loading11 from './loading/loading11.gif';

const Spinner = () => {
    let loading = [loading1, loading2, loading3, loading4, loading5, loading6, loading7, loading8, loading9, loading10, loading11]
    return (
        <div className='text-center'>
            <img style={{ margin: '25vh 0' }} src={loading[Math.floor(Math.random() * 12)]} alt="" />
        </div>
    )
}

export default Spinner