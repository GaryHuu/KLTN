import Footer from 'components/Footer'
import Header from 'components/Header'
import AdminPage from 'features/Admin'
import React, { Fragment, Suspense } from 'react'
import { Route, Switch } from 'react-router'

const Home = React.lazy(() => import('features/Home'))
const Cart = React.lazy(() => import('features/Cart'))
const Product = React.lazy(() => import('features/Product'))
const User = React.lazy(() => import('features/User'))
const AboutUs = React.lazy(() => import('features/AboutUs'))
const NotFound = React.lazy(() => import('features/NotFound'))

function App() {
  return (
    <Fragment>
      <Suspense fallback={<div className='loading-lazy' />}>
        <Switch>
          <Route path='/admin' component={AdminPage} />
          <Route>
            <Header />
            <main>
              <Switch>
                <Route path='/' exact component={Home} />
                <Route path='/cart' component={Cart} />
                <Route path='/product' component={Product} />
                <Route path='/user' component={User} />
                <Route path='/about-us' component={AboutUs} />
                <Route component={NotFound} />
              </Switch>
            </main>
            <Footer />
          </Route>
        </Switch>
      </Suspense>
    </Fragment>
  )
}

export default App
