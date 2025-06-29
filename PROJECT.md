O desafio da Revi é fazer uma aplicação Web de batalha de monstros, onde o usuário pode criar um monstro e lutar contra outros monstros.

https://userevi.notion.site/Desafio-t-cnico-Revi-97676da6f197400a8f34c2c18af578d7

A principio não é necessário um Backend, vai ser tudo via client, mas acho que poderia ter uma backend para que outros jogadores possam batalhar com os monstro de outras pessoas ou então criar alguns monstros iniciais para ser mais user friendly.

A minha ideia era fazer algo parecido com os jogos antigos do Street Fighter e Mortal Kombat, onde o jogador tem o modo livre que ele pode lutar contra outro monstro, e também tem o modo torneio que ele vai lutando contra monstros cada vez mais fortes até derrotar todos ou perder, e toda vez que ele derrota um monstro ele ganha pontos de habilidades.

A Stack do projeto pede somente React + TypeScript.

Em questões de estrutura de pasta, vai seguir o padrão de todo frontend

- src
	- components
	- pages
	- utils
	- ...

## Features
- O jogador pode criar um monstro.
- O jogador pode lutar contra outros monstro.
- No modo torneio o jogador ganha pontos por monstro derrotado.
- O jogador tem limites de pontos para criar o seu monstro.
- O monstro pode dar um attack critico e dar o dano com - 1/3 da defesa
## Layout
![DIAGRAMS](https://github.com/user-attachments/assets/a38d30c8-f891-47f1-8afb-1a27e50ad4d0)

Pelo fato do Layout ser para um game decidir seguir com uma SPA, para ter uma navegação mais fluida.

Achei um lista com alguns monstros durante a pesquisa https://www.aidedd.org/dnd-filters/monsters.php

Como não vai ter um backend, vou armazenar os monstro criados pelo usuário no localStorage dentro de um array.

Para iniciar uma batalha vai ter que passar o id dos monstro na como query param assim `left=1` e `right=2`, então a batalha vai ser totalmente gerada e salva no localStorage dentro de um array desta forma: { id: string, logs: string[], timestamp: number, winner: string (id do monstro) }

Na tela de winner, vai ser necessário um param com o id da batalha.
