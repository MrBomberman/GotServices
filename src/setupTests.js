import {configure} from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
require('jest-extended');
// чтобы спокойно использовать enzyme - настраиваем его
// также настраиваем config для тестов
configure({adapter: new Adapter});

const config = {
    "jest": {
        "setupTestFrameworkScriptFile": "jest-extended"
      }
}

export default config;