import {BsDot} from 'react-icons/bs';
export default function ErrorMessageMain()
{
    return <div className='error-main'><h2 className='error-main-line-1'>Please turn on Location</h2>
    <div>
        <p className='error-main-options'><BsDot />Allow location services in your browser or</p>
        <p className='error-main-options'><BsDot />Use the search bar on the top-left</p>
    </div>
    </div>
}