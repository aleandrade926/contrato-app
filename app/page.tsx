'use client'
import { useState } from 'react'

interface DadosContrato {
  vendedor: {
    nome: string;
    estadoCivil: string;
    nacionalidade: string;
    profissao: string;
    rg: string;
    cpf: string;
    endereco: string;
    email: string;
  };
  comprador: {
    nome: string;
    estadoCivil: string;
    nacionalidade: string;
    profissao: string;
    cpf: string;
    rg: string;
    endereco: string;
    email: string;
  };
  imovel: {
    descricao: string;
    matricula: string;
    cartorio: string;
    municipio: string;
    coisasNoImovel: string;
    numeroMatricula: string;
    contribuintePrefeitura: string;
  };
  pagamento: {
    valorTotal: string;
    valorSinal: string;
    condicoesSinal: string;
    condicoesPagamentoFinal: string;
    valorFinal: string;
    dadosBancarios: string;
    prazoEscritura: string;
  };
  comissao: {
    valor: string;
    imobiliaria: string;
    dadosImobiliaria: string;
    corretor: string;
    dadosCorretor: string;
  };
  dataContrato: string;
}

export default function GeradorContratoImovel() {
  const [dados, setDados] = useState<DadosContrato>({
    vendedor: {
      nome: '',
      estadoCivil: '',
      nacionalidade: '',
      profissao: '',
      rg: '',
      cpf: '',
      endereco: '',
      email: ''
    },
    comprador: {
      nome: '',
      estadoCivil: '',
      nacionalidade: '',
      profissao: '',
      cpf: '',
      rg: '',
      endereco: '',
      email: ''
    },
    imovel: {
      descricao: '',
      matricula: '',
      cartorio: '',
      municipio: '',
      coisasNoImovel: '',
      numeroMatricula: '',
      contribuintePrefeitura: ''
    },
    pagamento: {
      valorTotal: '',
      valorSinal: '',
      condicoesSinal: '',
      condicoesPagamentoFinal: '',
      valorFinal: '',
      dadosBancarios: '',
      prazoEscritura: '30'
    },
    comissao: {
      valor: '',
      imobiliaria: '',
      dadosImobiliaria: '',
      corretor: '',
      dadosCorretor: ''
    },
    dataContrato: new Date().toLocaleDateString('pt-BR')
  });

  const [contratoGerado, setContratoGerado] = useState(false);

  const handleChange = <
  K extends keyof DadosContrato,
  F extends keyof DadosContrato[K]
>(
  e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  grupo: K,
  campo: F
) => {
  setDados(prev => ({
    ...prev,
    [grupo]: {
      ...(prev[grupo] as object), // Correção aqui
      [campo]: e.target.value
    }
  }));
}

  const gerarContrato = () => {
    if (!dados.vendedor.nome || !dados.comprador.nome || !dados.imovel.descricao) {
      alert('Por favor, preencha os campos obrigatórios: Vendedor, Comprador e Descrição do Imóvel');
      return;
    }
    setContratoGerado(true);
  }

  const voltarParaEdicao = () => {
    setContratoGerado(false);
  }

  const formatarMoeda = (valor: string) => {
    if (!valor) return '_____________';
    const numberValue = Number(valor.replace(/[^0-9,-]/g, '').replace(',', '.'));
    return new Intl.NumberFormat('pt-BR', { 
      style: 'currency', 
      currency: 'BRL' 
    }).format(numberValue);
  }

  const numeroPorExtenso = (numero: number): string => { // Correção aqui
    const unidades = ['', 'um', 'dois', 'três', 'quatro', 'cinco', 'seis', 'sete', 'oito', 'nove'];
    const de10a19 = ['dez', 'onze', 'doze', 'treze', 'quatorze', 'quinze', 'dezesseis', 'dezessete', 'dezoito', 'dezenove'];
    const dezenas = ['', 'dez', 'vinte', 'trinta', 'quarenta', 'cinquenta', 'sessenta', 'setenta', 'oitenta', 'noventa'];
    const centenas = ['', 'cento', 'duzentos', 'trezentos', 'quatrocentos', 'quinhentos', 'seiscentos', 'setecentos', 'oitocentos', 'novecentos'];
  
    if (numero === 100) return 'cem';
    if (numero < 10) return unidades[numero];
    if (numero >= 10 && numero < 20) return de10a19[numero - 10];
    if (numero >= 20 && numero < 100) {
      const dezena = Math.floor(numero / 10);
      const unidade = numero % 10;
      return dezenas[dezena] + (unidade !== 0 ? ' e ' + unidades[unidade] : '');
    }
    if (numero >= 100 && numero < 1000) {
      const centena = Math.floor(numero / 100);
      const resto = numero % 100;
      return centenas[centena] + (resto !== 0 ? ' e ' + numeroPorExtenso(resto) : '');
    }
    return numero.toString();
  }

  const renderContratoCompleto = () => (
    <div style={{ 
      padding: '40px',
      fontFamily: 'Times New Roman',
      fontSize: '12pt',
      lineHeight: '1.5',
      maxWidth: '800px',
      margin: '0 auto'
    }}>
      <h1 style={{ 
        textAlign: 'center', 
        textTransform: 'uppercase',
        fontSize: '14pt',
        marginBottom: '30px'
      }}>
        Instrumento Particular de Promessa de Venda e Compra de Bem Imóvel Residencial
      </h1>
      
      <p style={{ textAlign: 'justify', textIndent: '50px' }}>
        Pelo presente Instrumento Particular de Promessa de Venda e Compra de bem imóvel ("Instrumento") e na melhor forma de direito, de um lado: <strong>{dados.vendedor.nome || '________________'}</strong>, <strong>{dados.vendedor.nacionalidade || '________________'}</strong>, <strong>{dados.vendedor.estadoCivil || '________________'}</strong>, <strong>{dados.vendedor.profissao || '________________'}</strong>, portador(a) da Cédula de Identidade RG: <strong>{dados.vendedor.rg || '________________'}</strong>, inscrito(a) no CPF: <strong>{dados.vendedor.cpf || '________________'}</strong>, residente e domiciliado(a) na <strong>{dados.vendedor.endereco || '________________'}</strong>, e-mail: <strong>{dados.vendedor.email || '________________'}</strong>, doravante denominada "PARTE VENDEDORA";
      </p>
      
      <p style={{ textAlign: 'justify', textIndent: '50px', marginTop: '20px' }}>
        e de outro lado: <strong>{dados.comprador.nome || '________________'}</strong>, <strong>{dados.comprador.nacionalidade || '________________'}</strong>, <strong>{dados.comprador.estadoCivil || '________________'}</strong>, <strong>{dados.comprador.profissao || '________________'}</strong>, portador(a) da Cédula de Identidade RG: <strong>{dados.comprador.rg || '________________'}</strong>, inscrito(a) no CPF: <strong>{dados.comprador.cpf || '________________'}</strong>, residente e domiciliado(a) na <strong>{dados.comprador.endereco || '________________'}</strong>, e-mail: <strong>{dados.comprador.email || '________________'}</strong>, doravante denominada "PARTE COMPRADORA";
      </p>

      <p style={{ textAlign: 'justify', marginTop: '20px' }}>
        As partes acima mencionadas e devidamente qualificadas têm entre si justos e contratados as cláusulas e condições que mutuamente declaram, outorgam e aceitam, a saber: 
      </p>

      <h2 style={{ 
        textAlign: 'center', 
        marginTop: '30px',
        fontSize: '12pt',
        fontWeight: 'bold'
      }}>
        CLÁUSULA PRIMEIRA - DO IMÓVEL
      </h2>

      <p style={{ textAlign: 'justify', textIndent: '50px' }}>
        A PARTE VENDEDORA declara, sob responsabilidade civil e criminal que, por justo título e direito, é a única proprietária e possuidora do imóvel objeto do presente instrumento, que foi havido pela PARTE VENDEDORA e devidamente registrado na matrícula de nº <strong>{dados.imovel.numeroMatricula || '________________'}</strong>, no <strong>{dados.imovel.cartorio || '____'}</strong>º. Oficial de Registro de Imóveis de <strong>{dados.imovel.municipio || '________________'}</strong>, que possui a seguinte descrição: 
      </p>

      <div style={{ 
        textAlign: 'center', 
        margin: '20px 0', 
        fontStyle: 'italic',
        padding: '10px',
        border: '1px solid #ddd'
      }}>
        <strong>{dados.imovel.descricao || '[Descrição detalhada do imóvel]'}</strong>
      </div>

      <p style={{ textAlign: 'justify', textIndent: '50px' }}>
        1.2 O imóvel acima descrito está inscrito no contribuinte da Prefeitura do Município de <strong>{dados.imovel.municipio || '________________'}</strong> sob o nº <strong>{dados.imovel.contribuintePrefeitura || '________________'}</strong>, encontra-se sem débitos tributários de qualquer espécie. 
      </p>

      <h2 style={{ 
        textAlign: 'center', 
        marginTop: '30px',
        fontSize: '12pt',
        fontWeight: 'bold'
      }}>
        CLÁUSULA SEGUNDA – DO PREÇO E CONDIÇÕES DE PAGAMENTO
      </h2>

      <p style={{ textAlign: 'justify', textIndent: '50px' }}>
        2.1. O preço total, certo e ajustado da presente negociação é de <strong>{formatarMoeda(dados.pagamento.valorTotal)}</strong> ({dados.pagamento.valorTotal ? numeroPorExtenso(Number(dados.pagamento.valorTotal.replace(/[^0-9]/g, ''))) : '_____________'}), que deverá ser pago pela PARTE COMPRADORA da seguinte forma: 
      </p>

      <ol style={{ listStyleType: 'lower-alpha', paddingLeft: '70px' }}>
        <li style={{ marginBottom: '10px' }}>
          <strong>{formatarMoeda(dados.pagamento.valorSinal)}</strong>: {dados.pagamento.condicoesSinal || '_________________________'}, a título de princípio de pagamento, com recursos próprios, no ato da assinatura do instrumento particular de promessa de venda e compra, em favor de <strong>{dados.vendedor.nome || '________________'}</strong>, mediante transferência eletrônica bancária <strong>{dados.pagamento.dadosBancarios || '________________'}</strong>;
        </li>
        <li style={{ marginBottom: '10px' }}>
          <strong>{dados.pagamento.condicoesPagamentoFinal || '_________________________'}</strong>, com recursos próprios, na data da lavratura da escritura pública definitiva, em até {dados.pagamento.prazoEscritura || '____'} ({dados.pagamento.prazoEscritura ? numeroPorExtenso(Number(dados.pagamento.prazoEscritura)) : '________'}) dias contados da assinatura do presente instrumento;
        </li>
        <li>
          <strong>{formatarMoeda(dados.pagamento.valorFinal)}</strong>, com recursos próprios, na data da lavratura da escritura pública definitiva.
        </li>
      </ol>

      <p style={{ textAlign: 'justify', textIndent: '50px', marginTop: '15px' }}>
        2.2 O atraso injustificado dos pagamentos discriminados acima, penalizará o PARTE COMPRADORA em multa de 10% (dez por cento) sobre o valor do débito, acrescido de juros de mora de 1% (um por cento) ao mês, ou fração de mês, calculados pro rata die, e de correção monetária pelo IGPM-FGV, acumulado no período, incidentes cumulativamente, desde a sua respectiva data de vencimento.
      </p>

      <p style={{ textAlign: 'justify', textIndent: '50px' }}>
        2.3 As datas dos pagamentos informadas na Cláusula 2.1 acima, poderão de comum acordo ser alteradas desde que aceitas por ambas as partes.
      </p>

      <h2 style={{ 
        textAlign: 'center', 
        marginTop: '30px',
        fontSize: '12pt',
        fontWeight: 'bold'
      }}>
        CLÁUSULA TERCEIRA - DA DOCUMENTAÇÃO
      </h2>

      <p style={{ textAlign: 'justify', textIndent: '50px' }}>
        3.1 A PARTE VENDEDORA, apresenta na presente data os seguintes documentos:  
      </p>

      <ul style={{ listStyleType: 'none', paddingLeft: '50px' }}>
        <li>• Cópia dos documentos pessoais, RG, CPF e/ou CNH.</li>
        <li>• Cópia simples da certidão de Casamento.</li>
        <li>• Certidão original de matrícula do imóvel em nome da PARTE VENDEDORA com negativa de ônus e alienações.</li>
        <li>• Certidão de Dados Cadastrais do Imóvel.</li>
        <li>• Consulta Valor Venal de Referência (ITBI).</li>
        <li>• Certidão de Recolhimento da Taxa de Lixo (2003 a 2005).</li>
        <li>• Certidão negativa de tributos e taxas municipais incidentes sobre o imóvel e/ou comprovante de quitação dos débitos.</li>
        <li>• Consulta CENPROT – Cartórios de Protestos (Nacional).</li>
        <li>• Certidão Conjunta Negativa de Débitos Relativos a Tributos Federais e à Dívida Ativa da União expedida pela Procuradoria Geral da Fazenda Nacional e Receita Federal do Brasil.</li>
        <li>• Certidão Conjunta de Débitos de Tributos Mobiliários.</li>
        <li>• Certidão Negativa de Débitos Tributários não Inscritos da Fazenda Estadual.</li>
        <li>• Certidão Negativa de Débitos tributários estaduais.</li>
        <li>• Certidão negativa de débitos da Justiça Trabalhista.</li>
        <li>• Certidão negativa do distribuidor da Justiça do Trabalho.</li>
        <li>• Certidão negativa dos distribuidores relacionados com processos de falência, recuperação judicial e concordata, período de 10 (dez) anos.</li>
        <li>• Certidão negativa dos distribuidores relacionados a inventários, período de 10 (dez) anos.</li>
        <li>• Certidão dos distribuidores cíveis, executivos fiscais, municipais e estaduais, período de 10 (dez) anos.</li>
        <li>• Certidão negativa do distribuidor da Justiça Federal (cível e criminal), período de 10 (dez) anos.</li>
        <li>• Declaração do síndico, com firma reconhecida, de que não existe débito para com o condomínio, bem como cópia autenticada da Ata da Assembleia Geral que elegeu o síndico.</li>
        <li>• Certidões negativas de participações societárias, ou certidões fiscais negativas das empresas.</li>
      </ul>

      <p style={{ textAlign: 'justify', textIndent: '50px', marginTop: '15px' }}>
        3.2 Ficam as partes cientes de que a documentação referida na cláusula 3.1 foi apresentada dentro dos seus respectivos prazos de validade e foram previamente analisadas pela PARTE COMPRADORA, que anui com a lisura da presente negociação.
      </p>

      <p style={{ textAlign: 'justify', textIndent: '50px' }}>
        3.3 É de responsabilidade das partes buscar auxílio jurídico para analisar a documentação e garantir a segurança jurídica da negociação, cientes de que a imobiliária figura na presente transação como intermediadora e facilitadora da comunicação entre as partes.
      </p>

      <p style={{ textAlign: 'justify', textIndent: '50px' }}>
        3.4 O presente instrumento é pactuado com Cláusula expressa de IRREVOGABILIDADE e IRRETRATABILIDADE, não sendo lícito a qualquer das Partes arrepender-se das cláusulas e condições aqui estabelecidas, por si, seus herdeiros, ou eventuais sucessores, a quaisquer títulos, renunciando as partes expressamente ao direito de arrependimento.
      </p>

      <h2 style={{ 
        textAlign: 'center', 
        marginTop: '30px',
        fontSize: '12pt',
        fontWeight: 'bold'
      }}>
        CLÁUSULA QUARTA – DA IMISSÃO DA POSSE
      </h2>

      <p style={{ textAlign: 'justify', textIndent: '50px' }}>
        4.1 A PARTE COMPRADORA será imitida na posse do imóvel quando do pagamento integral do preço e após a lavratura da Escritura, conforme descrito na Cláusula 2.1. "b", deste instrumento, que será entregue com os seguintes bens móveis: <strong>{dados.imovel.coisasNoImovel || '________________'}</strong>.
      </p>

      <p style={{ textAlign: 'justify', textIndent: '50px' }}>
        4.2 A partir da transmissão da posse, passa a ser de responsabilidade da PARTE COMPRADORA ou daquele(s) que ela vier a indicar, todas as despesas que venham a incidir sobre o imóvel, tais como todos os impostos, taxas e incidentes, ressalvadas eventuais cobranças relativas aos períodos anteriores à sua imissão na posse, ainda que lançadas posteriormente, cujo pagamento será de responsabilidade exclusiva da PARTE VENDEDORA, que se compromete a saldá-los nos vencimentos ou reembolsar, prontamente, quaisquer valores que venham a ser pagos pela PARTE COMPRADORA a este título, sob pena de não o fazendo no prazo de 05 (cinco) dias úteis da comunicação, em penalização de multa de 2% (dois por cento) sobre o valor do débito, acrescido de juros de mora de 1% (um por cento) ao mês, ou fração de mês, calculados pro rata die, e de correção monetária pelo IGP-M ou IPCA (o que for maior), acumulada no período, incidentes cumulativamente, nesta ordem, desde a data do desembolso até a data do efetivo reembolso.
      </p>
      
      <p style={{ textAlign: 'justify', textIndent: '50px' }}>
        4.3 Na data da entrega das chaves do referido imóvel ao PARTE COMPRADORA, a PARTE VENDEDORA se obriga a apresentar todos os documentos que comprovem a adimplência do imóvel objeto deste instrumento em relação a impostos e taxas junto à prefeitura, contas de consumo como: SABESP, ENEL, além de débitos condominiais, dentre outras que possam incidir sobre o objeto.
      </p>

      <p style={{ textAlign: 'justify', textIndent: '50px' }}>
        4.4 O imóvel deverá ser entregue à PARTE COMPRADORA livre e desembaraçado de pessoas e coisas.
      </p>

      <h2 style={{ 
        textAlign: 'center', 
        marginTop: '30px',
        fontSize: '12pt',
        fontWeight: 'bold'
      }}>
        CLÁUSULA QUINTA – DAS OBRIGAÇÕES
      </h2>

      <p style={{ textAlign: 'justify', textIndent: '50px' }}>
        5.1 A PARTE VENDEDORA se obriga a:
      </p>

      <ol style={{ listStyleType: 'lower-alpha', paddingLeft: '70px' }}>
        <li style={{ marginBottom: '10px' }}>
          Entregar o imóvel livre e desembaraçado de pessoas e coisas, em perfeito estado de conservação e funcionamento, inclusive com as instalações elétricas, hidráulicas e sanitárias em perfeitas condições de uso;
        </li>
        <li style={{ marginBottom: '10px' }}>
          Entregar todas as chaves do imóvel, inclusive de portões, armários embutidos e demais dependências;
        </li>
        <li style={{ marginBottom: '10px' }}>
          Apresentar todos os documentos necessários à lavratura da escritura pública de compra e venda, inclusive certidões negativas de débitos tributários municipais, estaduais e federais, certidões negativas de ações judiciais, certidão negativa de ônus e ações reais, dentre outros que se fizerem necessários;
        </li>
        <li style={{ marginBottom: '10px' }}>
          Arcar com todas as despesas decorrentes da lavratura da escritura pública de compra e venda, inclusive ITBI, emolumentos cartorários, honorários advocatícios, registro da escritura, dentre outros;
        </li>
        <li>
          Indenizar a PARTE COMPRADORA por quaisquer danos decorrentes do inadimplemento de suas obrigações.
        </li>
      </ol>

      <p style={{ textAlign: 'justify', textIndent: '50px', marginTop: '15px' }}>
        5.2 A PARTE COMPRADORA se obriga a:
      </p>

      <ol style={{ listStyleType: 'lower-alpha', paddingLeft: '70px' }}>
        <li style={{ marginBottom: '10px' }}>
          Efetuar o pagamento do preço nas condições e prazos ajustados na Cláusula Segunda deste instrumento;
        </li>
        <li style={{ marginBottom: '10px' }}>
          Arcar com todas as despesas decorrentes da transferência de titularidade de contas de consumo (água, luz, gás, condomínio, etc.);
        </li>
        <li>
          Indenizar a PARTE VENDEDORA por quaisquer danos decorrentes do inadimplemento de suas obrigações.
        </li>
      </ol>

      <h2 style={{ 
        textAlign: 'center', 
        marginTop: '30px',
        fontSize: '12pt',
        fontWeight: 'bold'
      }}>
        CLÁUSULA SEXTA – DA MULTA
      </h2>

      <p style={{ textAlign: 'justify', textIndent: '50px' }}>
        6.1 Em caso de desistência ou inadimplemento por parte da PARTE COMPRADOR, ficará este obrigado ao pagamento de multa compensatória no valor de 10% (dez por cento) sobre o valor total do negócio, além da perda dos valores eventualmente pagos a título de sinal, sem prejuízo da obrigação de reparar eventuais danos causados.
      </p>

      <p style={{ textAlign: 'justify', textIndent: '50px' }}>
        6.2 Em caso de desistência ou inadimplemento por parte da PARTE VENDEDORA, ficará esta obrigada ao pagamento de multa compensatória no valor de 10% (dez por cento) sobre o valor total do negócio, além da restituição em dobro dos valores eventualmente recebidos a título de sinal, sem prejuízo da obrigação de reparar eventuais danos causados.
      </p>

      <h2 style={{ 
        textAlign: 'center', 
        marginTop: '30px',
        fontSize: '12pt',
        fontWeight: 'bold'
      }}>
        CLÁUSULA SÉTIMA – DA ESCRITURA
      </h2>

      <p style={{ textAlign: 'justify', textIndent: '50px' }}>
        7.1 A escritura pública de compra e venda será lavrada no prazo máximo de {dados.pagamento.prazoEscritura || '____'} ({dados.pagamento.prazoEscritura ? numeroPorExtenso(Number(dados.pagamento.prazoEscritura)) : '________'}) dias contados da data da assinatura deste instrumento, no Cartório de Notas de escolha do PARTE COMPRADORA.
      </p>

      <p style={{ textAlign: 'justify', textIndent: '50px' }}>
        7.2 Todas as despesas decorrentes da lavratura da escritura pública, inclusive ITBI, emolumentos cartorários, honorários advocatícios, registro da escritura, dentre outros, correrão por conta da PARTE VENDEDORA.
      </p>

      <h2 style={{ 
        textAlign: 'center', 
        marginTop: '30px',
        fontSize: '12pt',
        fontWeight: 'bold'
      }}>
        CLÁUSULA OITAVA – DA INTERMEDIAÇÃO IMOBILIÁRIA
      </h2>

      <p style={{ textAlign: 'justify', textIndent: '50px' }}>
        8.1 As partes reconhecem que a negociação objeto deste instrumento foi intermediada por {dados.comissao.imobiliaria || '________________'}, representada pelo corretor de imóveis {dados.comissao.corretor || '________________'}, que fará jus à comissão no valor de {formatarMoeda(dados.comissao.valor)}, a ser paga pela PARTE VENDEDORA na data da lavratura da escritura pública.
      </p>

      <p style={{ textAlign: 'justify', textIndent: '50px' }}>
        8.2 A comissão deverá ser paga mediante depósito na seguinte conta bancária: {dados.comissao.dadosImobiliaria || '________________'}.
      </p>

      <h2 style={{ 
        textAlign: 'center', 
        marginTop: '30px',
        fontSize: '12pt',
        fontWeight: 'bold'
      }}>
        CLÁUSULA NONA – DO FORO
      </h2>

      <p style={{ textAlign: 'justify', textIndent: '50px' }}>
        9.1 Para dirimir quaisquer controvérsias oriundas do presente instrumento, as partes elegem o foro da Comarca de <strong>{dados.imovel.municipio || '________________'}</strong>, com renúncia expressa a qualquer outro, por mais privilegiado que seja.
      </p>

      <h2 style={{ 
        textAlign: 'center', 
        marginTop: '30px',
        fontSize: '12pt',
        fontWeight: 'bold'
      }}>
        CLÁUSULA DÉCIMA – DAS DISPOSIÇÕES GERAIS
      </h2>

      <p style={{ textAlign: 'justify', textIndent: '50px' }}>
        10.1 O presente instrumento obriga as partes e seus sucessores a qualquer título, constituindo título executivo extrajudicial nos termos do art. 784, inciso III, do CPC.
      </p>

      <p style={{ textAlign: 'justify', textIndent: '50px' }}>
        10.2 As partes declaram que leram e compreenderam todas as cláusulas deste instrumento, concordando integralmente com seu teor, assinando-o em duas vias de igual teor e forma, juntamente com duas testemunhas.
      </p>

      <div style={{ marginTop: '50px', display: 'flex', justifyContent: 'space-between' }}>
        <div style={{ textAlign: 'center', width: '45%' }}>
          <p>_________________________________________</p>
          <p>PARTE VENDEDORA</p>
          <p><strong>{dados.vendedor.nome || '[Nome do Vendedor]'}</strong></p>
        </div>

        <div style={{ textAlign: 'center', width: '45%' }}>
          <p>_________________________________________</p>
          <p>PARTE COMPRADORA</p>
          <p><strong>{dados.comprador.nome || '[Nome do Comprador]'}</strong></p>
        </div>
      </div>

      <div style={{ marginTop: '50px', display: 'flex', justifyContent: 'space-around' }}>
        <div style={{ textAlign: 'center', width: '45%' }}>
          <p>_________________________________________</p>
          <p>TESTEMUNHA</p>
          <p>Nome: _________________________</p>
          <p>CPF: _________________________</p>
        </div>

        <div style={{ textAlign: 'center', width: '45%' }}>
          <p>_________________________________________</p>
          <p>TESTEMUNHA</p>
          <p>Nome: _________________________</p>
          <p>CPF: _________________________</p>
        </div>
      </div>

      <p style={{ textAlign: 'center', marginTop: '30px' }}>
        {dados.imovel.municipio || 'São Paulo'}, {dados.dataContrato}.
      </p>

      <div style={{ marginTop: '40px', textAlign: 'center' }}>
        <button 
          onClick={voltarParaEdicao}
          style={{
            padding: '10px 20px',
            backgroundColor: '#6c757d',
            color: 'white',
            border: 'none',
            borderRadius: '4px',
            marginRight: '15px',
            cursor: 'pointer'
          }}
        >
          Voltar para Edição
        </button>
        
        <button 
          onClick={() => window.print()}
          style={{
            padding: '10px 20px',
            backgroundColor: '#28a745',
            color: 'white',
            border: 'none',
            borderRadius: '4px',
            cursor: 'pointer'
          }}
        >
          Imprimir Contrato
        </button>
      </div>
    </div>
  );

  const renderFormulario = () => (
    <div style={{ maxWidth: '800px', margin: '0 auto' }}>
      <h1 style={{ textAlign: 'center', color: '#6f42c1', marginBottom: '30px' }}>
        Gerador de Contrato de Promessa de Compra e Venda
      </h1>
      
      <div style={{ 
        backgroundColor: '#f8f9fa', 
        padding: '20px', 
        borderRadius: '5px',
        marginBottom: '30px'
      }}>
        <h2 style={{ color: '#6f42c1', marginBottom: '15px' }}>Dados do Vendedor</h2>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '15px' }}>
          <div>
            <label>Nome Completo:*</label>
            <input
              type="text"
              value={dados.vendedor.nome}
              onChange={(e) => handleChange(e, 'vendedor', 'nome')}
              style={{ width: '100%', padding: '8px', marginTop: '5px' }}
              required
            />
          </div>
          <div>
            <label>Estado Civil:</label>
            <input
              type="text"
              value={dados.vendedor.estadoCivil}
              onChange={(e) => handleChange(e, 'vendedor', 'estadoCivil')}
              style={{ width: '100%', padding: '8px', marginTop: '5px' }}
              placeholder="Solteiro, casado, divorciado, etc."
            />
          </div>
          <div>
            <label>Nacionalidade:</label>
            <input
              type="text"
              value={dados.vendedor.nacionalidade}
              onChange={(e) => handleChange(e, 'vendedor', 'nacionalidade')}
              style={{ width: '100%', padding: '8px', marginTop: '5px' }}
              placeholder="Ex: brasileira, portuguesa, italiana..."
            />
          </div>
          <div>
            <label>Profissão:</label>
            <input
              type="text"
              value={dados.vendedor.profissao}
              onChange={(e) => handleChange(e, 'vendedor', 'profissao')}
              style={{ width: '100%', padding: '8px', marginTop: '5px' }}
            />
          </div>
          <div>
            <label>RG:</label>
            <input
              type="text"
              value={dados.vendedor.rg}
              onChange={(e) => handleChange(e, 'vendedor', 'rg')}
              style={{ width: '100%', padding: '8px', marginTop: '5px' }}
            />
          </div>
          <div>
            <label>CPF:*</label>
            <input
              type="text"
              value={dados.vendedor.cpf}
              onChange={(e) => handleChange(e, 'vendedor', 'cpf')}
              style={{ width: '100%', padding: '8px', marginTop: '5px' }}
              required
            />
          </div>
          <div>
            <label>Endereço:</label>
            <input
              type="text"
              value={dados.vendedor.endereco}
              onChange={(e) => handleChange(e, 'vendedor', 'endereco')}
              style={{ width: '100%', padding: '8px', marginTop: '5px' }}
            />
          </div>
          <div>
            <label>E-mail:</label>
            <input
              type="email"
              value={dados.vendedor.email}
              onChange={(e) => handleChange(e, 'vendedor', 'email')}
              style={{ width: '100%', padding: '8px', marginTop: '5px' }}
            />
          </div>
        </div>
      </div>

      <div style={{ 
        backgroundColor: '#f8f9fa', 
        padding: '20px', 
        borderRadius: '5px',
        marginBottom: '30px'
      }}>
        <h2 style={{ color: '#6f42c1', marginBottom: '15px' }}>Dados do Comprador</h2>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '15px' }}>
          <div>
            <label>Nome Completo:*</label>
            <input
              type="text"
              value={dados.comprador.nome}
              onChange={(e) => handleChange(e, 'comprador', 'nome')}
              style={{ width: '100%', padding: '8px', marginTop: '5px' }}
              required
            />
          </div>
          <div>
            <label>Estado Civil:</label>
            <input
              type="text"
              value={dados.comprador.estadoCivil}
              onChange={(e) => handleChange(e, 'comprador', 'estadoCivil')}
              style={{ width: '100%', padding: '8px', marginTop: '5px' }}
              placeholder="Solteiro, casado, divorciado, etc."
            />
          </div>
          <div>
            <label>Nacionalidade:</label>
            <input
              type="text"
              value={dados.comprador.nacionalidade}
              onChange={(e) => handleChange(e, 'comprador', 'nacionalidade')}
              style={{ width: '100%', padding: '8px', marginTop: '5px' }}
              placeholder="Ex: brasileira, portuguesa, italiana..."
            />
          </div>
          <div>
            <label>Profissão:</label>
            <input
              type="text"
              value={dados.comprador.profissao}
              onChange={(e) => handleChange(e, 'comprador', 'profissao')}
              style={{ width: '100%', padding: '8px', marginTop: '5px' }}
            />
          </div>
          <div>
            <label>CPF:*</label>
            <input
              type="text"
              value={dados.comprador.cpf}
              onChange={(e) => handleChange(e, 'comprador', 'cpf')}
              style={{ width: '100%', padding: '8px', marginTop: '5px' }}
              required
            />
          </div>
          <div>
            <label>RG:</label>
            <input
              type="text"
              value={dados.comprador.rg}
              onChange={(e) => handleChange(e, 'comprador', 'rg')}
              style={{ width: '100%', padding: '8px', marginTop: '5px' }}
            />
          </div>
          <div>
            <label>Endereço:</label>
            <input
              type="text"
              value={dados.comprador.endereco}
              onChange={(e) => handleChange(e, 'comprador', 'endereco')}
              style={{ width: '100%', padding: '8px', marginTop: '5px' }}
            />
          </div>
          <div>
            <label>E-mail:</label>
            <input
              type="email"
              value={dados.comprador.email}
              onChange={(e) => handleChange(e, 'comprador', 'email')}
              style={{ width: '100%', padding: '8px', marginTop: '5px' }}
            />
          </div>
        </div>
      </div>

      <div style={{ 
        backgroundColor: '#f8f9fa', 
        padding: '20px', 
        borderRadius: '5px',
        marginBottom: '30px'
      }}>
        <h2 style={{ color: '#6f42c1', marginBottom: '15px' }}>Dados do Imóvel</h2>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '15px' }}>
          <div style={{ gridColumn: '1 / -1' }}>
            <label>Descrição Completa do Imóvel:*</label>
            <textarea
              value={dados.imovel.descricao}
              onChange={(e) => handleChange(e, 'imovel', 'descricao')}
              style={{ width: '100%', padding: '8px', marginTop: '5px', minHeight: '100px' }}
              required
              placeholder="Endereço completo, área, quartos, vagas de garagem, etc."
            />
          </div>
          <div>
            <label>Número da Matrícula:</label>
            <input
              type="text"
              value={dados.imovel.numeroMatricula}
              onChange={(e) => handleChange(e, 'imovel', 'numeroMatricula')}
              style={{ width: '100%', padding: '8px', marginTop: '5px' }}
            />
          </div>
          <div>
            <label>Cartório:</label>
            <input
              type="text"
              value={dados.imovel.cartorio}
              onChange={(e) => handleChange(e, 'imovel', 'cartorio')}
              style={{ width: '100%', padding: '8px', marginTop: '5px' }}
              placeholder="Ex: 1º Oficial de Registro de Imóveis"
            />
          </div>
          <div>
            <label>Município:</label>
            <input
              type="text"
              value={dados.imovel.municipio}
              onChange={(e) => handleChange(e, 'imovel', 'municipio')}
              style={{ width: '100%', padding: '8px', marginTop: '5px' }}
            />
          </div>
          <div>
            <label>Número Contribuinte Prefeitura:</label>
            <input
              type="text"
              value={dados.imovel.contribuintePrefeitura}
              onChange={(e) => handleChange(e, 'imovel', 'contribuintePrefeitura')}
              style={{ width: '100%', padding: '8px', marginTop: '5px' }}
            />
          </div>
          <div>
            <label>Bens que ficam no imóvel:</label>
            <input
              type="text"
              value={dados.imovel.coisasNoImovel}
              onChange={(e) => handleChange(e, 'imovel', 'coisasNoImovel')}
              style={{ width: '100%', padding: '8px', marginTop: '5px' }}
              placeholder="Móveis, eletrodomésticos, etc."
            />
          </div>
        </div>
      </div>

      <div style={{ 
        backgroundColor: '#f8f9fa', 
        padding: '20px', 
        borderRadius: '5px',
        marginBottom: '30px'
      }}>
        <h2 style={{ color: '#6f42c1', marginBottom: '15px' }}>Condições de Pagamento</h2>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '15px' }}>
          <div>
            <label>Valor Total (R$):*</label>
            <input
              type="text"
              value={dados.pagamento.valorTotal}
              onChange={(e) => handleChange(e, 'pagamento', 'valorTotal')}
              style={{ width: '100%', padding: '8px', marginTop: '5px' }}
              required
              placeholder="Ex: 500000,00"
            />
          </div>
          <div>
            <label>Valor do Sinal (R$):</label>
            <input
              type="text"
              value={dados.pagamento.valorSinal}
              onChange={(e) => handleChange(e, 'pagamento', 'valorSinal')}
              style={{ width: '100%', padding: '8px', marginTop: '5px' }}
              placeholder="Ex: 50000,00"
            />
          </div>
          <div>
            <label>Condições do Sinal:</label>
            <input
              type="text"
              value={dados.pagamento.condicoesSinal}
              onChange={(e) => handleChange(e, 'pagamento', 'condicoesSinal')}
              style={{ width: '100%', padding: '8px', marginTop: '5px' }}
              placeholder="Ex: À vista, no ato da assinatura"
            />
          </div>
          <div>
            <label>Condições Pagamento Final:</label>
            <input
              type="text"
              value={dados.pagamento.condicoesPagamentoFinal}
              onChange={(e) => handleChange(e, 'pagamento', 'condicoesPagamentoFinal')}
              style={{ width: '100%', padding: '8px', marginTop: '5px' }}
              placeholder="Ex: Financiamento bancário"
            />
          </div>
          <div>
            <label>Valor Final (R$):</label>
            <input
              type="text"
              value={dados.pagamento.valorFinal}
              onChange={(e) => handleChange(e, 'pagamento', 'valorFinal')}
              style={{ width: '100%', padding: '8px', marginTop: '5px' }}
              placeholder="Ex: 450000,00"
            />
          </div>
          <div>
            <label>Dados Bancários para Transferência:</label>
            <input
              type="text"
              value={dados.pagamento.dadosBancarios}
              onChange={(e) => handleChange(e, 'pagamento', 'dadosBancarios')}
              style={{ width: '100%', padding: '8px', marginTop: '5px' }}
              placeholder="Banco, agência, conta, nome do titular"
            />
          </div>
          <div>
            <label>Prazo para Escritura (dias):</label>
            <input
              type="number"
              value={dados.pagamento.prazoEscritura}
              onChange={(e) => handleChange(e, 'pagamento', 'prazoEscritura')}
              style={{ width: '100%', padding: '8px', marginTop: '5px' }}
              min="1"
            />
          </div>
        </div>
      </div>

      <div style={{ 
        backgroundColor: '#f8f9fa', 
        padding: '20px', 
        borderRadius: '5px',
        marginBottom: '30px'
      }}>
        <h2 style={{ color: '#6f42c1', marginBottom: '15px' }}>Dados da Comissão</h2>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '15px' }}>
          <div>
            <label>Valor da Comissão (R$):</label>
            <input
              type="text"
              value={dados.comissao.valor}
              onChange={(e) => handleChange(e, 'comissao', 'valor')}
              style={{ width: '100%', padding: '8px', marginTop: '5px' }}
              placeholder="Ex: 15000,00"
            />
          </div>
          <div>
            <label>Nome da Imobiliária:</label>
            <input
              type="text"
              value={dados.comissao.imobiliaria}
              onChange={(e) => handleChange(e, 'comissao', 'imobiliaria')}
              style={{ width: '100%', padding: '8px', marginTop: '5px' }}
            />
          </div>
          <div>
            <label>Dados Bancários da Imobiliária:</label>
            <input
              type="text"
              value={dados.comissao.dadosImobiliaria}
              onChange={(e) => handleChange(e, 'comissao', 'dadosImobiliaria')}
              style={{ width: '100%', padding: '8px', marginTop: '5px' }}
              placeholder="Banco, agência, conta, nome da imobiliária"
            />
          </div>
          <div>
            <label>Nome do Corretor:</label>
            <input
              type="text"
              value={dados.comissao.corretor}
              onChange={(e) => handleChange(e, 'comissao', 'corretor')}
              style={{ width: '100%', padding: '8px', marginTop: '5px' }}
            />
          </div>
          <div>
            <label>Dados Bancários do Corretor:</label>
            <input
              type="text"
              value={dados.comissao.dadosCorretor}
              onChange={(e) => handleChange(e, 'comissao', 'dadosCorretor')}
              style={{ width: '100%', padding: '8px', marginTop: '5px' }}
              placeholder="Banco, agência, conta, nome do corretor"
            />
          </div>
        </div>
      </div>

      <div style={{ textAlign: 'center', marginTop: '30px' }}>
        <button
          onClick={gerarContrato}
          style={{
            padding: '12px 24px',
            backgroundColor: '#6f42c1',
            color: 'white',
            border: 'none',
            borderRadius: '5px',
            fontSize: '16px',
            cursor: 'pointer'
          }}
        >
          Gerar Contrato
        </button>
      </div>
    </div>
  );

  return (
    <div style={{ padding: '20px' }}>
      {!contratoGerado ? renderFormulario() : renderContratoCompleto()}
    </div>
  );
}