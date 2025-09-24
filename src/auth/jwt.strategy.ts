import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';

import { PayloadType } from '../common/interface/payload-type.interface';

import { ExtractJwt, Strategy } from 'passport-jwt';
import { authConstants } from './auth.constants';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor() {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: authConstants.secret,
    });
  }

  validate(payload: PayloadType) {
    return {
      userId: payload.userId,
      email: payload.email,
      artistId: payload.artistId,
    };
  }
}
