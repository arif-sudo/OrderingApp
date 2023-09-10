import { AuthGuard } from '@nestjs/passport'
import { Injectable } from '@nestjs/common'

@Injectable()
export class LocalAuthGuard extends AuthGuard('local') {}

// With @UseGuards(AuthGuard('local')) we are using an AuthGuard that @nestjs/passportautomatically provisioned for us when we extended the passport-local strategy.
// Let's break that down.
// Our Passport local strategy has a default name of 'local'. 
// We reference that name in the @UseGuards() decorator to associate it with code supplied by the passport-local package.
// This is used to disambiguate which strategy to invoke in case we have multiple Passport strategies in our app (each of which may provision a strategy-specific AuthGuard).
// While we only have one such strategy so far, we'll shortly add a second, so this is needed for disambiguation.

// *** Passport automatically creates a user object, based on the value we return from the validate() method, and assigns it to the Request object as req.user.