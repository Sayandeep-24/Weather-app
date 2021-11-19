import {BsDot} from 'react-icons/bs';
export default function ErrorMessageMain()
{
    return <div className='error-main'><h2 className='error-main-line-1'>Location Not Found</h2>
    <div className='error-main-line-2'>To fix this issue, please:</div>
    <div>
        <p className='error-main-options'><BsDot />Allow location services in your browser</p>
        <p className='error-main-options'><BsDot />Use the search bar on the top-left instead</p>
    </div>
    </div>
}