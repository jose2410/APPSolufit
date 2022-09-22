import { Usuario } from './usuario';
export interface AuthResponse {
  ok: boolean;
  token: string;
  user: Usuario;
  //afiliado: Afiliado;
  //isAfiliado: string;
}
