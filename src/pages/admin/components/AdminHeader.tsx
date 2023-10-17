import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faBellConcierge,
  faMessage,
  faSearch,
  faUserAstronaut,
} from '@fortawesome/free-solid-svg-icons';
import cn from '../../../utils/cn';
import IconButton from '../../../components/IconButton';

export default function AdminHeader() {
  return (
    <header className='flex shadow shadow-gray-900'>
      <div className='my-6 mx-6 flex grow gap-8 items-center'>
        <h3 className='text-3xl last:border-b py-2'>Logo</h3>

        <AdminHeaderSearchbar />
        <nav className='ml-auto'>
          <ul className='flex gap-6 items-center'>
            <li>
              <IconButton>
                <FontAwesomeIcon
                  icon={faBellConcierge}
                  className='text-xl text-gray-200'
                />
              </IconButton>
            </li>
            <li>
              <button>
                <FontAwesomeIcon
                  icon={faMessage}
                  className='text-xl text-gray-200'
                />
              </button>
            </li>
            <li>
              <button>
                <FontAwesomeIcon
                  icon={faUserAstronaut}
                  className='text-xl text-gray-600 text-center rounded-full bg-amber-400 p-2'
                />
              </button>
            </li>
          </ul>
        </nav>
      </div>
    </header>
  );
}

function AdminHeaderSearchbar() {
  const classes = {
    containerClasses: cn([
      'flex gap-2 items-center rounded-full bg-gray-500 px-6 py-3',
      'focus-within:ring-2 focus-within:ring-amber-400 focus-within:ring-offset-2',
    ]),
    inputClasses: cn([
      'bg-transparent border-none outline-none placeholder-gray-200 grow',
    ]),
    buttonClasses: cn([
      'bg-transparent border-none outline-none text-gray-200',
    ]),
  };

  function handleSearch(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    console.log('searching...');
  }

  return (
    <form
      id='adminHeaderSearchbar'
      className={classes.containerClasses}
      onSubmit={handleSearch}
    >
      <input
        type='text'
        placeholder='Search'
        className={classes.inputClasses}
      />
      <button
        type='submit'
        form='adminHeaderSearchbar'
        className={classes.buttonClasses}
      >
        <FontAwesomeIcon icon={faSearch} />
      </button>
    </form>
  );
}
