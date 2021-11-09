import React from 'react'
import Cell from '../../components/Cell'
import { storiesOf } from '@storybook/react'

import '../../styles/app.sass'

storiesOf('Cell', module).add('Cell', () => <Cell cellIndex={1} palaceIndex={1} />)
