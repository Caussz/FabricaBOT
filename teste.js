const fs = require('fs');

const ilhaA = [
    {
        aluno: {
            locado: false,
            nome: 'Não informado',
            turma: 'Não informado',
            email: 'Não informado',
            totalprojetos: 0
        },
        local: '-a1',
        notebook: false,
        last: 'Última modificação no dia 05/06/2023',
        pc: {
            marca: '',
            cpu: '',
            ram: '',
            HDD: '',
            wifi: false,
            status: '',
            patrimonio: null,
            perifericos: {
                mause: '',
                teclado: '',
                all: true,
                monitor: {
                    monitor1: {
                        marca: '',
                        patrimonio: null
                    },
                    monitor2: {
                        marca: '',
                        patrimonio: null
                    }
                }
            }

        }
    },
    {
        aluno: {
            locado: false,
            nome: 'Não informado',
            turma: 'Não informado',
            email: 'Não informado',
            totalprojetos: 0
        },
        local: '-a2',
        notebook: false,
        last: 'Última modificação no dia 05/06/2023',
        pc: {
            marca: '',
            cpu: '',
            ram: '',
            HDD: '',
            wifi: false,
            status: '',
            patrimonio: null,
            perifericos: {
                mause: '',
                teclado: '',
                all: true,
                monitor: {
                    monitor1: {
                        marca: '',
                        patrimonio: null
                    },
                    monitor2: {
                        marca: '',
                        patrimonio: null
                    }
                }
            }

        }
    },
    {
        aluno: {
            locado: false,
            nome: 'Não informado',
            turma: 'Não informado',
            email: 'Não informado',
            totalprojetos: 0
        },
        local: '-a3',
        notebook: false,
        last: 'Última modificação no dia 05/06/2023',
        pc: {
            marca: '',
            cpu: '',
            ram: '',
            HDD: '',
            wifi: false,
            status: '',
            patrimonio: null,
            perifericos: {
                mause: '',
                teclado: '',
                all: true,
                monitor: {
                    monitor1: {
                        marca: '',
                        patrimonio: null
                    },
                    monitor2: {
                        marca: '',
                        patrimonio: null
                    }
                }
            }

        }
    },
    {
        aluno: {
            locado: false,
            nome: 'Não informado',
            turma: 'Não informado',
            email: 'Não informado',
            totalprojetos: 0
        },
        local: '-a4',
        notebook: false,
        last: 'Última modificação no dia 05/06/2023',
        pc: {
            marca: '',
            cpu: '',
            ram: '',
            HDD: '',
            wifi: false,
            status: '',
            patrimonio: null,
            perifericos: {
                mause: '',
                teclado: '',
                all: true,
                monitor: {
                    monitor1: {
                        marca: '',
                        patrimonio: null
                    },
                    monitor2: {
                        marca: '',
                        patrimonio: null
                    }
                }
            }

        }
    },
    {
        aluno: {
            locado: false,
            nome: 'Não informado',
            turma: 'Não informado',
            email: 'Não informado',
            totalprojetos: 0
        },
        local: '-a5',
        notebook: false,
        last: 'Última modificação no dia 05/06/2023',
        pc: {
            marca: '',
            cpu: '',
            ram: '',
            HDD: '',
            wifi: false,
            status: '',
            patrimonio: null,
            perifericos: {
                mause: '',
                teclado: '',
                all: true,
                monitor: {
                    monitor1: {
                        marca: '',
                        patrimonio: null
                    },
                    monitor2: {
                        marca: '',
                        patrimonio: null
                    }
                }
            }

        }
    },
    {
        aluno: {
            locado: false,
            nome: 'Não informado',
            turma: 'Não informado',
            email: 'Não informado',
            totalprojetos: 0
        },
        local: '-a6',
        notebook: false,
        last: 'Última modificação no dia 05/06/2023',
        pc: {
            marca: '',
            cpu: '',
            ram: '',
            HDD: '',
            wifi: false,
            status: '',
            patrimonio: null,
            perifericos: {
                mause: '',
                teclado: '',
                all: true,
                monitor: {
                    monitor1: {
                        marca: '',
                        patrimonio: null
                    },
                    monitor2: {
                        marca: '',
                        patrimonio: null,
                        
                    }
                }
            }

        }
    },
    
]


const jsonData = JSON.stringify(ilhaA);

fs.writeFile('ilhaA.json', jsonData, (err) => {
    if (err) throw err;
    console.log('Arquivo JSON exportado com sucesso!');
});