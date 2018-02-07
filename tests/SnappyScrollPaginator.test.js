import test from 'ava'
import Enzyme from 'enzyme'
import Adapter from 'enzyme-adapter-react-16'

import SnappyScrollPaginator from '../src/SnappyScrollPaginator.js'

Enzyme.configure({ adapter: new Adapter() })

test('<SnappyScrollPaginator />', t => {
  t.fail()
})
