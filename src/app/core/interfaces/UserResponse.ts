import { Usuario } from './usuario';
export interface UserResponse {
  ok: boolean;
  token: string;
  usuario: Usuario;
  //afiliado: Afiliado;
  //isAfiliado: string;
}
