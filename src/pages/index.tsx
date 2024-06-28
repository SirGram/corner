
import ComicStore from '../projects/comicstore.mdx'

import {MDXProvider} from '@mdx-js/react';




const components = {
  em: props => <i {...props} />
}

const MyPage = () => (
  <MDXProvider components={components}>
    <ComicStore />
  </MDXProvider>
);

export default MyPage;