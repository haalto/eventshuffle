import { Type } from '@sinclair/typebox';

export const DateSchema = Type.String({ format: 'date' });

export const uuidSchema = Type.String({ format: 'uuid' });
