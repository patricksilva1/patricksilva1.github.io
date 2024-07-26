---
layout: post
title:  "Banco De Dados"
date:   2024-07-25 21:50:58 -0300
categories: BD
---

`Normalização de Tabelas`

> Formas Normais (FN)


 - 1 FN - Diz respeito aos problemas de atributos compostos e multivalorados. Desmembrar os atributos compostos e criar novas relações para os multivalorados.

 - 2 FN - Para estar na 2 FN, primeiramente deve etar na 1 FN e ser dependente parcial de chaves.

 - 3 FN - Precisa estar na 2 FN. Resolve o problema de dependencia funcional entre não-chaves.

 - FNBC - É a 3 FN com mais rigor. Resolve o problema onde tenha duas ou mais chaves candidatas (lembrando que uma PK também é uma chave candidata)

 - 4 FN - Precisa estar na FNBC. Resolve o problema de dependência multivalorada.

 - 5 FN - Precisa estar na 4 FNBC. Resolve o problema de dependência multipla entre os atributos de uma tabela.


Check out the [Jekyll docs][jekyll-docs] for more info on how to get the most out of Jekyll. File all bugs/feature requests at [Jekyll’s GitHub repo][jekyll-gh]. If you have questions, you can ask them on [Jekyll Talk][jekyll-talk].

[jekyll-docs]: https://jekyllrb.com/docs/home
[jekyll-gh]:   https://github.com/jekyll/jekyll
[jekyll-talk]: https://talk.jekyllrb.com/
