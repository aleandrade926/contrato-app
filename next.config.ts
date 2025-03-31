import type { NextConfig } from 'next'

const config: NextConfig = {
  output: 'export', // Isso gera a pasta `out` automaticamente
  trailingSlash: true, // Importante para rotas na Hostinger
  images: { 
    unoptimized: true // Desativa otimização (necessário para exportação estática)
  }
}

export default config