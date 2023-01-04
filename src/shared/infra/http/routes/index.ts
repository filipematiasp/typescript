import { Router } from "express"
import productsRouter  from "@modules/products/infra/http/routes/products.routes"
import usersRouter from "@modules/users/infra/http/routes/users.routes"
import sessionRouter from "@modules/users/infra/http/routes/sessions.routes"
import passwordRouter from "@modules/users/infra/http/routes/password.routes"
import profileRouter from "@modules/users/infra/http/routes/profile.routes"
import customersRouter from "@modules/customers/routes/customers.routes"
import ordersRouter from "@modules/orders/infra/http/routes/orders.routes"

const router = Router()

router.use('/products', productsRouter)
router.use('/users', usersRouter)
router.use('/sessions', sessionRouter)
router.use('/password', passwordRouter)
router.use('/profile', profileRouter)
router.use('/customers', customersRouter)
router.use('/orders', ordersRouter)

export default router
