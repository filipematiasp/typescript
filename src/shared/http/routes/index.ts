import { Router } from "express"
import productsRouter  from "@modules/products/routes/products.routes"
import usersRouter from "@modules/Users/routes/users.routes"
import sessionRouter from "@modules/Users/routes/sessions.routes"
import passwordRouter from "@modules/Users/routes/Password.routes"

const router = Router()

router.use('/products', productsRouter)
router.use('/users', usersRouter)
router.use('/sessions', sessionRouter)
router.use('/password', passwordRouter)


export default router
