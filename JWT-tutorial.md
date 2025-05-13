# Key Concepts:

JWT Structure: Header, Payload, Signature.

Passport JWT Strategy: Validates the JWT token in requests.

JWT Auth Guard: Protects routes and validates the token using the JwtStrategy.

Role-Based Access Control: Protects routes by roles within the JWT payload.

## Set Up Dependencies

Install necessary dependencies:

npm install @nestjs/passport passport passport-local @nests/jwt passport-jwt

## 2 Create Auth Module

Create an auth module using nest g module auth.

Generate an auth.service.ts and auth.controller.ts using nest g service auth and nest g controller auth.

## 3 Configure JWT

In auth.module.ts, import and configure JWT:

```typescript
import { JwtModule } from '@nestjs/jwt';

@Module({
  imports: [
    JwtModule.register({
      secret: process.env.JWT_SECRET,
      signOptions: { expiresIn: '60s' },  // JWT expiry
    }),
  ],
})
```

## 4 AuthService: Generate JWT Token

In auth.service.ts, create a method to issue JWT tokens after validating user credentials:

## 5 AuthController: Login Endpoint

Create a POST login endpoint in auth.controller.ts where the credentials are checked and JWT is returned.

## 6 JWT Strategy

Set up the Passport JWT strategy to extract and validate the JWT from request headers.

```typescript
@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(
    @InjectRepository(User) private userRepository: Repository<User>,
  ) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: process.env.JWT_SECRET,
    });
  }

  async validate(payload: any) {
    return { userId: payload.userId }; // Can also fetch user details from the DB
  }
}
```

## 7 JWT Auth Guard

Create an AuthGuard that uses the JwtStrategy to validate incoming requests:

```typescript
@Injectable()
export class JwtAuthGuard extends AuthGuard('jwt') {}
```

## 8 Protect Routes with Auth Guard

In your controller, protect routes by using @UseGuards(JwtAuthGuard) to require JWT authentication:

```typescript
@UseGuards(JwtAuthGuard)
@Get('profile')
getProfile(@Request() req) {
  return req.user;  // User info from JWT payload
}
```

## 9 RBAC Role-Based Access Control (RBAC)

Optionally, you can add roles to the JWT and create additional guards to protect specific roles:

```typescript
@Roles('admin')
@UseGuards(JwtAuthGuard, RolesGuard)
@Get('admin')
getAdminData() {
  return 'Admin Data';
}
```

result check list

### 1 Update AuthService to Return a Token

Update the validateUser() function and add a login() function that returns the token:

### 2. Create the AuthController Login Route

Set up a POST route to log in with @UseGuards(AuthGuard('local')).

### 3. Test with Postman

Method: POST

URL: http://localhost:3000/auth/login

Body (raw JSON):
