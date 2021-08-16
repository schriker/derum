import { GetStaticProps } from 'next';
import React from 'react';
import Layout from '../components/Layout/Layout';
import Markdown from '../components/Markdown/Markdown';
import StaticPageLayout from '../components/StaticPageLayout/StaticPageLayout';
import { indexRoomVars } from '../consts';
import {
  MeDocument,
  MeQuery,
  MeQueryVariables,
  RoomDocument,
  RoomQuery,
  RoomQueryVariables,
} from '../generated/graphql';
import useRoomData from '../hooks/useRoomData';
import { addApolloState, initializeApollo } from '../lib/apolloClient';

const markdown = `## I. Pojęcia ogólne 
          
* **Regulamin** – niniejszy regulamin 
* **Serwis** – serwis internetowy "Derum.pl", działający pod adresem https://www.derum.pl/ 
* **Usługodawca** – właściciel serwisu będący osobą fizyczną - Marcin Janus 
* **Usługobiorca** – każda osoba fizyczna, uzyskująca dostęp do Serwisu i korzystająca z usług świadczonych za pośrednictwem Serwisu przez Usługodawcę. 
* **Komunikacja Drogą Elektroniczną** – Komunikacja pomiędzy stronami za pośrednictwem poczty elektronicznej (e-mail). 

## II. Postanowienia ogólne 

* Regulamin, określa zasady funkcjonowania i użytkowania Serwisu oraz określa zakres praw i obowiązków Usługobiorców i Usługodawcy związanych z użytkowaniem Serwisu. 
* Przedmiotem usług Usługodawcy jest udostępnienie nieodpłatnych narzędzi w postaci Serwisu, umożliwiających Usługobiorcom dostęp do treści w postaci wpisów, artykułów i materiałów audiowizualnych lub aplikacji internetowych i formularzy elektronicznych. 
* Wszelkie ewentualne treści, artykuły i informacje zawierające cechy wskazówek lub porad publikowane na łamach Serwisu są jedynie ogólnym zbiorem informacji i nie są kierowane do poszczególnych Usługobiorców. Usługodawca nie ponosi odpowiedzialności za wykorzystanie ich przez Usługobiorców. 
* Usługobiorca bierze na siebie pełną odpowiedzialno za sposób wykorzystania materiałów udostępnianych w ramach Serwisu w tym za wykorzystanie ich zgodnie z obowiązującymi przepisami prawa. 
* Usługodawca nie udziela żadnej gwarancji co do przydatności materiałów umieszczonych w Serwisie.
* Usługodawca nie ponosi odpowiedzialności z tytułu ewentualnych szkód poniesionych przez Usługobiorców Serwisu lub osoby trzecie w związku z korzystaniem z Serwisu. Wszelkie ryzyko związane z korzystaniem z Serwisu, a w szczególności z używaniem i wykorzystywaniem informacji umieszczonych w Serwisie, ponosi Usługobiorca korzystający z usług Serwisu. 

## III. Warunki używania Serwisu 

* Używanie Serwisu przez każdego z Usługobiorców jest nieodpłatne i dobrowolne.
* Usługobiorcy mają obowiązek zapoznania się z Regulaminem oraz pozostałymi dokumentami stanowiącymi jego integralną część i muszą zaakceptować w całości jego postanowienia w celu dalszego korzystania z Serwisu. 
* Usługobiorcy nie mogą wykorzystywać żadnych pozyskanych w Serwisie danych osobowych do celów marketingowych. 
* Wymagania techniczne korzystania z Serwisu:
  * urządzenie z wyświetlaczem umożliwiające wyświetlanie stron internetowych, 
  * połączenie z internetem, 
  * dowolna przeglądarka internetowa, która wyświetla strony internetowe zgodnie ze standardami i postanowieniami Konsorcjum W3C i obsługuje strony www udostępniane w języku HTML5, 
  * włączoną obsługę skryptów JavaScript, 
  * włączoną obsługę plików Cookie 
* W celu zapewnienia bezpieczeństwa Usługodawcy, Usługobiorcy oraz innych Usługobiorców korzystających z Serwisu, wszyscy Usługobiorcy korzystający z Serwisu powinni stosować się do ogólnie przyjętych zasad bezpieczeństwa w sieci.
* Zabrania się działań wykonywanych osobiście przez Usługobiorców lub przy użyciu oprorgamowania: 
  * bez zgody pisemnej, powodujących nadmierne obciążenie serwera Serwisu, 
  * bez zgody pisemnej, prób wykrycia luk w zabezpieczeniach Serwisu i konfiguracji serwera, 
  * podejmowania prób wgrywania lub wszczykiwania na serwer i do bazy danych kodu, skryptów i oprogramowania mogących wyrządzić szkodę oprogramowaniu Serwisu, innym Usługobiorcom lub Usługodawcy, 
  * podejmowania prób wgrywania lub wszczykiwania na serwer i do bazy danych kodu, skryptów i oprogramowania mogących śledzić lub wykradać dane Usługobiorców lub Usługodawcy, 
  * podejmowania jakichkolwiek działań mających na celu uszkodzenie, zablokowanie działania Serwisu lub uniemożliwienie realizacji celu w jakim działa Serwis. 
* W przypadku wykrycia zaistnienia lub potencjalnej możliwości zaistnienia incydentu Cyberbezpieczeństwa lub naruszenia RODO, Usługobiorcy w pierwszej kolejności powinni zgłosić ten fakt Usługodawcy w celu szybkiego usunięcia problemu / zagrożenia i zabezpieczenia interesów wszystkich Usługobiorców Serwisu. 

## IV. Warunki oraz zasady rejestracji

* Usługobiorcy mogą korzystać z Serwisu bez konieczności rejestracji.
* Usługobiorcy muszą być zarejestrowani i posiadać konto w Serwisie by korzystać z dodatkowych usług świadczonych w Serwisie, dostępnych jedynie dla Usługobiorców po zalogowaniu. 
* Rejestracja w Serwisie jest dobrowolna. 
* Rejestracja w Serwisie jest nieodpłatna. 
* Każdy Usługobiorca może posiadać tylko jedno konto w Serwisie. 
* Wymagania techniczne związane z rejestracją konta: 
  * posiadanie indywidualnego konta poczty elektronicznej e-mail, 
* Rejestrujący się w Serwisie Usługobiorcy wyrażają zgodę na przetwarzanie ich danych osobowych przez Usługobiorcę w zakresie w jakim zostały one wprowadzone do Serwisu podczas procesu rejestracji oraz ich późniejszych zmianom lub usunięciu. 
* Usługodawca ma prawo zawieszać lub usuwać konta Usługobiorców według własnego uznania, uniemożliwiając lub ograniczając w ten sposób dostęp do poszczególnych lub wszystkich usług, treści, materiałów i zasobów Serwisu, w szczególności jeżeli Usługobiorca dopuści się łamania Regulaminu, powszechnie obowiązujących przepisów prawa, zasad współżycia społecznego lub działa na szkodę Usługodawcy lub innych Usługobiorców, uzasadnionego interesu Usługodawcy oraz podmiotów trzecich współpracujących lub nie z Usługodawcą. 
* Wszelkie usługi Serwisu mogą być zmieniane co do ich treści i zakresu, dodawane lub odejmowane, a także czasowo zawieszane lub dostęp do nich może być ograniczany, według swobodnej decyzji Usługodawcy, bez możliwości wnoszenia sprzeciwu w tym zakresie przez Usługobiorców. 
* Dodatkowe zasady bezpieczeństwa w zakresie korzystania z konta: 
  * Zabrania się Usługobiorcom zarejestrowanym w Serwisie do udostępniania loginu oraz hasła do swojego konta osobom trzecim.
  * Usługodawca nie ma prawa i nigdy nie będzie zażądać od Usługobiorcy hasła do wybranego konta. 
* Usuwanie konta: 
  * Każdy Usługobiorca posiadający konto w Serwisie ma możliwość samodzielnego usunięcia konta z Serwisu. 
  * Usługobiorcy mogą to uczynić po zalogowaniu się w panelu w Serwisie. 
  * Usunięcie konta skutkuje usunięciem wszelkich danych identyfikacyjnych Usługobiorcy.

## V. Warunki komunikacji i świadczenia pozostałych usług w Serwisie 

* Serwis udostępnia usługi i narzędzia umożliwiające Usługobiorcom interakcję z Serwisem w postaci:
  * Komentowania wpisów i artykułów 
  * Publikowania własnych treści w postaci wpisów i artykułów 
  * Publikowanie własnych treści w postaci materiałów graficznych i multimedialnych 
* Serwis udostępnia dane kontaktowe w postaci: 
  * Adresu e-mail 
* W przypadku kontaktu Usługobiorcy z Usługodawcą, dane osobowe Usługobiorców będa przetwarzane zgodnie z "Polityką Prywatności", stanowiącą integralną część Regulaminu. 
* Warunki umieszczania treści przez Usługobiorców w Serwisie: 
  * Zabrania się umieszczania w Serwisie treści obraźliwych lub oszczerczych względem Usługodawcy, pozostałych Usługobiorców, osób trzecich oraz podmiotów trzecich, 
  * Zabrania się umieszczania w Serwisie materiałów tekstowcyh, graficznych, audiowizualnych, skryptów, programów i innych utworów, na które Usługobiorca nie posiada się licencji, lub których autor praw majątkowych nie wyraził zgody na darmową publikację, 
  * Zabrania się umieszczania w Serwisie treści wulgarnych, pornograficznych, erotycznych i niezgodnych z polskim i europejskim prawem a także odnośników do stron zawierających wskazane treści, 
  * Zabrania się umieszczania w Serwisie skryptów i programów nadmiernie obciążających serwer, oprogramowania nielegalnego, oprogramowania służącego do naruszania zabezpieczeń oraz innych podobnych działań a także odnośników do stron zawierających wskazane materiały, 
  * Zabrania się umieszczania w Serwisie treści merketingowych i reklamujących inne serwisy komercyjne, produkty, usługi czy komercyjne strony internetowe 

## VI. Gromadzenie danych o Usługobiorcach

W celu prawidłowego świadczenia usług przez Serwis, zabezpieczenia prawnego interesu Usługodawcy oraz w celu zapewnienia zgodności działania Serwisu z obowiązującym prawem, Usługodawca za pośrednictwem Serwisu gromadzi i przetwarza niektóre dane o Użytkownikach. 

W celu prawidłowego świadczenia usług, Serwis wykorzystuje i zapisuje niektóre anonimowe informacje o Usługobiorcy w plikach cookies.

Zakres, cele, sposób oraz zasady przetwarzania danych dostępne są w załącznikach do Regulaminu: „Obowiązek informacyjny RODO” oraz w „Polityce prywatności„, stanowiących integralną część Regulaminu. 

* Dane zbierane automatycznie: 
  
Do sprawnego działania Serwisu oraz do statystyk zbieramy automatycznie niektóre dane o Usługobiorcy. Do danych tych należą: 

  * Adres IP Typ przeglądarki 
  * Rozdzielczość ekranu
  * Przybliżona lokalizacja 
  * Otwierane podstrony serwisu 
  * Czas spędzony na odpowiedniej podstronie serwisu 
  * Rodzaj systemu operacyjnego 
  * Adres poprzedniej podstrony 
  * Adres strony odsyłającej Język przeglądarki 
  * Predkość łącza internetowego 
  * Dostawca usług internetowych 
  * Anonimowe dane demograficzne na podstawie danych Google Analytics: 
    * Płeć Wiek 
    * Zainteresowania 
Powyższe dane uzyskiwane są poprzez skrypt Google Analytics i są anonimowe. 

* Dane zbierane podczas rejestracji: 
  * Nazwa użytkownika, imię i nazwisko, adres e-mail W przypadku Usługobiorców zalogowanych (posiadających konto w Serwisie), w plikach cookies zapisywanych na urządzeniu Usługobiorcy może być umieszczony identyfikator Usługobiorcy powiązany z kontem Usługobiorcy.

## VII. Prawa autorskie 

  * Właścicielem Serwisu oraz praw autorskich do serwisu jest Usługodawca. 
  * Część danych zamieszczonych w Serwisie są chronione prawami autorskimi należącymi do firm, instytucji i osób trzecich, niepowiązanych w jakikolwiek sposób z Usługodawcą, i są wykorzystywane na podstawie uzyskanych licencji, lub opartych na licencji darmowej.
  * Na podstawie Ustawy z dnia 4 lutego 1994 o prawie autorskim zabrania się wykorzystywania, kopiowania, reprodukowania w jakiejkolwiek formie oraz przetrzymywania w systemach wyszukiwania z wyłączeniem wyszukiwarki Google, Bing, Yahoo, NetSprint, DuckDuckGo, Facebook oraz LinkedIn jakichkolwiek artykułów, opisów, zdjęć oraz wszelkich innych treści, materiałów graficznych, wideo lub audio znajdujących się w Serwisie bez pisemnej zgody lub zgody przekazanej za pomocą Komunikacji Drogą Elektroniczną ich prawnego właściciela. 
  * Zgodnie z Ustawą z dnia 4 lutego 1994 o prawie autorskim ochronie nie podlegają proste informacje prasowe, rozumiane jako same informacje, bez komentarza i oceny ich autora. Autor rozumie to jako możliwość wykorzystywania informacji z zamieszczonych w serwisie tekstów, ale już nie kopiowania całości lub części artykułów o ile nie zostało to oznaczone w poszczególnym materiale udostępnionym w Serwisie. 

## VIII. Zmiany Regulaminu 
  
  * Wszelkie postanowienia Regulaminu mogą być w każdej chwili jednostronnie zmieniane przez Usługodawcę, bez podawania przyczyn. 
  * Informacja o zmianie Regulaminu będzie rozsyłana Drogą Elektroniczną do Usługobiorców zarejestrowanych w Serwisie. 
  * W przypadku zmiany Regulaminu jego postanowienia wchodzą w życie natychmiast po jego publikacji dla Usługobiorców nieposiadających konta w Serwisie. 
  * W przypadku zmiany Regulaminu jego postanowienia wchodzą w życie z 7-dniowym okresem przejściowym dla Usługobiorców posiadających konta w Serwisie zarejestrowane przez zmianą Regulaminu.
  * Traktuje się iż każdy Usługobiorca, kontynuujący korzystanie z Serwisu po zmianie Regulaminu akceptuje go w całości. 

## IX. Postanowienia końcowe

  * Usługodawca nie odpowiada w żaden sposób, jak tylko pozwalają na to obowiązujące przepisy prawa, za treści przekazywane i publikowane w Serwisie przez Usługobiorców, za ich prawdziwość, rzetelność, autentyczność czy wady prawne. 
  * Usługodawca dokona wszelkich starań by usługi Serwisu były oferowane w sposób ciągły. Nie ponosi on jednak żadnej odpowiedzialności za zakłócenia spowodowane siłą wyższą lub niedozwoloną ingerencją Usługobiorców, osób trzecich czy działalnością zewnętrznych automatycznych programów. 
  * Usługodawca zastrzega sobie prawo do zmiany jakichkolwiek informacji umieszczonych w Serwisie w wybranym przez Usługodawcę terminie, bez konieczności uprzedniego powiadomienia Usługobiorców korzystających z usług Serwisu.
  * Usługodawca zastrzega sobie prawo do czasowego, całkowitego lub częściowego wyłączenia Serwisu w celu jego ulepszenia, dodawania usług lub przeprowadzania konserwacji, bez wcześniejszego uprzedzania o tym Usługobiorców. 
  * Usługodawca zastrzega sobie prawo do wyłączenia Serwisu na stałe, bez wcześniejszego uprzedzania o tym Usługobiorców.
  * Usługodawca zastrzega sobie prawo do dokonania cesji w części lub w całości wszelkich swoich praw i obowiązków związanych z Serwisem, bez zgody i możliwości wyrażania jakichkolwiek sprzeciwów przez Usługobiorców. 
  * Obowiązujące oraz poprzednie Regulaminy Serwisu znajduję się na tej podstronie pod aktualnym Regulaminem. 
  * We wszelkich sprawach związanych z działalnością Serwisu należy kontaktować się z Usługodawcę korzystając z jednej z poniższych form kontaktu: 
    * Wysyłając wiadomość na adres e-mail: kontakt@derum.pl 

Kontakt przy użyciu wskazanych środków komunikacji wyłącznie w sprawach związanych z prowadzonym Serwisem.
`;

export default function Rules() {
  useRoomData();

  return (
    <Layout title="Regulamin" ogDescription="Regulamin derum.pl.">
      <StaticPageLayout title="Regulamin">
        <Markdown>{markdown}</Markdown>
      </StaticPageLayout>
    </Layout>
  );
}

export const getStaticProps: GetStaticProps = async () => {
  try {
    const apolloClient = initializeApollo(null);
    await apolloClient.query<MeQuery, MeQueryVariables>({
      query: MeDocument,
      errorPolicy: 'ignore',
    });

    await apolloClient.query<RoomQuery, RoomQueryVariables>({
      query: RoomDocument,
      variables: {
        name: indexRoomVars.name,
      },
    });

    return addApolloState(apolloClient, {
      props: {},
    });
  } catch (e) {
    return {
      props: {},
      notFound: true,
    };
  }
};
