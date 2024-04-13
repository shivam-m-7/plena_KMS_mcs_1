/* eslint-disable prettier/prettier */
import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateKeyDto, UpdateKeyDto } from './dto';

@Injectable()
export class AccessKeyService {
  private keys = new Map<string, { data: unknown; expiration: number }>();

  generateKey(createKeyDto: CreateKeyDto) {
    const key = Math.random().toString(36).substr(2, 8);
    const expiration = Date.now() + createKeyDto.expiration * 60 * 1000;
    this.keys.set(key, {
      data: { ...createKeyDto, disabled: false },
      expiration,
    });
    return { key };
  }

  getKeyDetails(key: string) {
    const keyDetails = this.keys.get(key);
    if (!keyDetails || Date.now() > keyDetails.expiration) {
      throw new NotFoundException('Key not found or Key expired');
    }
    return keyDetails.data;
  }

  deleteKey(key: string) {
    if (!this.keys.has(key)) {
      throw new NotFoundException('Key not found');
    }
    return this.keys.delete(key);
  }

  updateKey(key: string, updateKeyDto: UpdateKeyDto) {
    const keyDetails = this.keys.get(key);
    if (!keyDetails) {
      throw new NotFoundException('Key not found');
    }
    Object.assign(keyDetails.data, updateKeyDto);
    return keyDetails.data;
  }

  listKeys() {
    return [...this.keys.values()].map(({ data }) => data);
  }
}
