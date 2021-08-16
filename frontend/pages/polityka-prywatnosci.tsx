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

const markdown = `
> Poniższa Polityka Prywatności określa zasady zapisywania i uzyskiwania dostępu do danych na Urządzeniach Użytkowników korzystających z Serwisu do celów świadczenia usług drogą elektroniczną przez Administratora oraz zasady gromadzenia i przetwarzania danych osobowych Użytkowników, które zostały podane przez nich osobiście i dobrowolnie za pośrednictwem narzędzi dostępnych w Serwisie. 

> Poniższa Polityka Prywatności jest integralną częścią Regulaminu Serwisu, który określa zasady, prawa i obowiązki Użytkowników korzystających z Serwisu.

## §1 Definicje

* **Serwis** - serwis internetowy "Derum.pl" działający pod adresem https://www.derum.pl/
 * **Serwis zewnętrzny** - serwisy internetowe partnerów, usługodawców lub usługobiorców współpracujących z Administratorem
 * **Administrator Serwisu / Danych** - Administratorem Serwisu oraz Administratorem Danych (dalej Administrator) jest osoba fizyczna "Marcin Janus" zamieszkała w Kolbuszowej, świadcząca usługi drogą elektroniczną za pośrednictwem Serwisu
 * **Użytkownik** - osoba fizyczna, dla której Administrator świadczy usługi drogą elektroniczną za pośrednictwem Serwisu.
 * **Urządzenie** - elektroniczne urządzenie wraz z oprogramowaniem, za pośrednictwem którego Użytkownik uzyskuje dostęp do Serwisu
 * **Cookies (ciasteczka)** - dane tekstowe gromadzone w formie plików zamieszczanych na Urządzeniu Użytkownika
 * **RODO** - Rozporządzenie Parlamentu Europejskiego i Rady (UE) 2016/679 z dnia 27 kwietnia 2016 r. w sprawie ochrony osób fizycznych w związku z przetwarzaniem danych osobowych i w sprawie swobodnego przepływu takich danych oraz uchylenia dyrektywy 95/46/WE (ogólne rozporządzenie o ochronie danych) 
 * **Dane osobowe** - oznaczają informacje o zidentyfikowanej lub możliwej do zidentyfikowania osobie fizycznej („osobie, której dane dotyczą”); możliwa do zidentyfikowania osoba fizyczna to osoba, którą można bezpośrednio lub pośrednio zidentyfikować, w szczególności na podstawie identyfikatora takiego jak imię i nazwisko, numer identyfikacyjny, dane o lokalizacji, identyfikator internetowy lub jeden bądź kilka szczególnych czynników określających fizyczną, fizjologiczną, genetyczną, psychiczną, ekonomiczną, kulturową lub społeczną tożsamość osoby fizycznej 
 * **Przetwarzanie** - oznacza operację lub zestaw operacji wykonywanych na danych osobowych lub zestawach danych osobowych w sposób zautomatyzowany lub niezautomatyzowany, taką jak zbieranie, utrwalanie, organizowanie, porządkowanie, przechowywanie, adaptowanie lub modyfikowanie, pobieranie, przeglądanie, wykorzystywanie, ujawnianie poprzez przesłanie, rozpowszechnianie lub innego rodzaju udostępnianie, dopasowywanie lub łączenie, ograniczanie, usuwanie lub niszczenie; 
 * **Ograniczenie przetwarzania** - oznacza oznaczenie przechowywanych danych osobowych w celu ograniczenia ich przyszłego przetwarzania 
 * **Profilowanie** - oznacza dowolną formę zautomatyzowanego przetwarzania danych osobowych, które polega na wykorzystaniu danych osobowych do oceny niektórych czynników osobowych osoby fizycznej, w szczególności do analizy lub prognozy aspektów dotyczących efektów pracy tej osoby fizycznej, jej sytuacji ekonomicznej, zdrowia, osobistych preferencji, zainteresowań, wiarygodności, zachowania, lokalizacji lub przemieszczania się 
 * **Zgoda** - zgoda osoby, której dane dotyczą oznacza dobrowolne, konkretne, świadome i jednoznaczne okazanie woli, którym osoba, której dane dotyczą, w formie oświadczenia lub wyraźnego działania potwierdzającego, przyzwala na przetwarzanie dotyczących jej danych osobowych 
 * **Naruszenie ochrony danych osobowych** - oznacza naruszenie bezpieczeństwa prowadzące do przypadkowego lub niezgodnego z prawem zniszczenia, utracenia, zmodyfikowania, nieuprawnionego ujawnienia lub nieuprawnionego dostępu do danych osobowych przesyłanych, przechowywanych lub w inny sposób przetwarzanych 
 * **Pseudonimizacja** - oznacza przetworzenie danych osobowych w taki sposób, by nie można ich było już przypisać konkretnej osobie, której dane dotyczą, bez użycia dodatkowych informacji, pod warunkiem że takie dodatkowe informacje są przechowywane osobno i są objęte środkami technicznymi i organizacyjnymi uniemożliwiającymi ich przypisanie zidentyfikowanej lub możliwej do zidentyfikowania osobie fizycznej 
* **Anonimizacja** - Anonimizacja danych to nieodwracalny proces operacji na danych, który niszczy / nadpisuje "dane osobowe" uniemożliwiając identyfikację, lub powiązanie danego rekordu z konkretnym użytkownikiem lub osobą fizyczną.
## §2 Inspektor Ochrony Danych
Na podstawie Art. 37 RODO, Administrator nie powołał Inspektora Ochrony Danych.

W sprawach dotyczących przetwarzania danych, w tym danych osobowych, należy kontaktować się bezpośrednio z Administratorem.

## §3 Rodzaje Plików Cookies

* **Cookies wewnętrzne** - pliki zamieszczane i odczytywane z Urządzenia Użytkownika przez system teleinformatyczny Serwisu
 * **Cookies zewnętrzne** - pliki zamieszczane i odczytywane z Urządzenia Użytkownika przez systemy teleinformatyczne Serwisów zewnętrznych. Skrypty Serwisów zewnętrznych, które mogą umieszczać pliki Cookies na Urządzeniach Użytkownika zostały świadomie umieszczone w Serwisie poprzez skrypty i usługi udostępnione i zainstalowane w Serwisie 
 * **Cookies sesyjne** - pliki zamieszczane i odczytywane z Urządzenia Użytkownika przez Serwis lub Serwisy zewnętrzne podczas jednej sesji danego Urządzenia. Po zakończeniu sesji pliki są usuwane z Urządzenia Użytkownika.
 * **Cookies trwałe** - pliki zamieszczane i odczytywane z Urządzenia Użytkownika przez Serwis lub Serwisy zewnętrzne do momentu ich ręcznego usunięcia. Pliki nie są usuwane automatycznie po zakończeniu sesji Urządzenia chyba że konfiguracja Urządzenia Użytkownika jest ustawiona na tryb usuwanie plików Cookie po zakończeniu sesji Urządzenia.
## §4 Bezpieczeństwo składowania danych
* **Mechanizmy składowania i odczytu plików Cookie** - Mechanizmy składowania, odczytu i wymiany danych pomiędzy Plikami Cookies zapisywanymi na Urządzeniu Użytkownika a Serwisem są realizowane poprzez wbudowane mechanizmy przeglądarek internetowych i nie pozwalają na pobieranie innych danych z Urządzenia Użytkownika lub danych innych witryn internetowych, które odwiedzał Użytkownik, w tym danych osobowych ani informacji poufnych. Przeniesienie na Urządzenie Użytkownika wirusów, koni trojańskich oraz innych robaków jest także praktycznie niemożliwe.
* **Cookie wewnętrzne** - zastosowane przez Administratora pliki Cookie są bezpieczne dla Urządzeń Użytkowników i nie zawierają skryptów, treści lub informacji mogących zagrażać bezpieczeństwu danych osobowych lub bezpieczeństwu Urządzenia z którego korzysta Użytkownik.
* **Cookie zewnętrzne** - Administrator dokonuje wszelkich możliwych działań w celu weryfikacji i doboru partnerów serwisu w kontekście bezpieczeństwa Użytkowników. Administrator do współpracy dobiera znanych, dużych partnerów o globalnym zaufaniu społecznym. Nie posiada on jednak pełnej kontroli nad zawartością plików Cookie pochodzących od zewnętrznych partnerów. Za bezpieczeństwo plików Cookie, ich zawartość oraz zgodne z licencją wykorzystanie przez zainstalowane w serwisie Skrypty, pochodzących z Serwisów zewnętrznych, Administrator nie ponosi odpowiedzialności na tyle na ile pozwala na to prawo. Lista partnerów zamieszczona jest w dalszej części Polityki Prywatności.
* **Kontrola plików Cookie**
  * Użytkownik może w dowolnym momencie, samodzielnie zmienić ustawienia dotyczące zapisywania, usuwania oraz dostępu do danych zapisanych plików Cookies przez każdą witrynę internetową
  * Informacje o sposobie wyłączenia plików Cookie w najpopularniejszych przeglądarkach komputerowych dostępne są na stronie: https://nety.pl/jak-wylaczyc-pliki-cookie/ lub u jednego ze wskazanych dostawców:
    * https://support.google.com/accounts/answer/61416?co=GENIE.Platform%3DDesktop&#038;hl=pl Zarządzanie plikami cookies w przeglądarce **Chrome**
    * https://help.opera.com/pl/latest/web-preferences/ Zarządzanie plikami cookies w przeglądarce **Opera**
    * https://support.mozilla.org/pl/kb/blokowanie-ciasteczek Zarządzanie plikami cookies w przeglądarce **FireFox**
    * https://support.microsoft.com/pl-pl/help/4027947/microsoft-edge-delete-cookies Zarządzanie plikami cookies w przeglądarce **Edge**
    * https://support.apple.com/pl-pl/guide/safari/sfri11471/mac Zarządzanie plikami cookies w przeglądarce **Safari**
    * https://windows.microsoft.com/pl-pl/internet-explorer/delete-manage-cookies#ie=ie-11 Zarządzanie plikami cookies w przeglądarce **Internet Explorer 11**
* Użytkownik może w dowolnym momencie usunąć wszelkie zapisane do tej pory pliki Cookie korzystając z narzędzi Urządzenia Użytkownika, za pośrednictwem którego Użytkownik korzysta z usług Serwisu.
* **Zagrożenia po stronie Użytkownika** - Administrator stosuje wszelkie możliwe środki techniczne w celu zapewnienia bezpieczeństwa danych umieszczanych w plikach Cookie. Należy jednak zwrócić uwagę, że zapewnienie bezpieczeństwa tych danych zależy od obu stron w tym działalności Użytkownika. Administrator nie bierze odpowiedzialności za przechwycenie tych danych, podszycie się pod sesję Użytkownika lub ich usunięcie, na skutek świadomej lub nieświadomej działalność Użytkownika, wirusów, koni trojańskich i innego oprogramowania szpiegującego, którymi może jest lub było zainfekowane Urządzenie Użytkownika. Użytkownicy w celu zabezpieczenia się przed tymi zagrożeniami powinni stosować się do https://nety.pl/cyberbezpieczenstwo/.
* **Przechowywanie danych osobowych** - Administrator zapewnia, że dokonuje wszelkich starań, by przetwarzane dane osobowe wprowadzone dobrowolnie przez Użytkowników były bezpieczne, dostęp do nich był ograniczony i realizowany zgodnie z ich przeznaczeniem i celami przetwarzania. Administrator zapewnia także, że dokonuje wszelkich starań w celu zabezpieczenia posiadanych danych przed ich utratą, poprzez stosowanie odpowiednich zabezpieczeń fizycznych jak i organizacyjnych.
* **Przechowywanie haseł** - Administrator oświadcza, że hasła przechowywane są w zaszyfrowanej postaci, używając najnowszych standardów i wytycznych w tym zakresie. Deszyfracja podawanych w Serwisie haseł dostępu do konta jest praktycznie niemożliwa.
## §5 Cele do których wykorzystywane są pliki Cookie
* Usprawnienie i ułatwienie dostępu do Serwisu
* Personalizacja Serwisu dla Użytkowników
* Umożliwienie Logowania do serwisu
* Marketing, Remarketing w serwisach zewnętrznych
 * Usługi serwowania reklam
 * Usługi afiliacyjne
* Prowadzenie statystyk (użytkowników, ilości odwiedzin, rodzajów urządzeń, łącze itp.)
* Serwowanie usług multimedialnych
* Świadczenie usług społecznościowych
## §6 Cele przetwarzania danych osobowych
Dane osobowe dobrowolnie podane przez Użytkowników są przetwarzane w jednym z następujących celów:
* Realizacji usług elektronicznych:* Usługi rejestracji i utrzymania konta Użytkownika w Serwisie i funkcjonalności z nim związanych
* Usługi komentowania / polubienia wpisów w Serwisie bez konieczności rejestrowania się
* Usługi udostępniania informacji o treści umieszczonych w Serwisie w serwisach społecznościowych lub innych witrynach.
* Komunikacji Administratora z Użytkownikami w sprawach związanych z Serwisem oraz ochrony danych
* Zapewnienia prawnie uzasadnionego interesu Administratora
Dane o Użytkownikach gromadzone anonimowo i automatycznie są przetwarzane w jednym z następujących celów:* Prowadzenie statystyk
* Remarketing
* Serwowanie reklam dostosowanych do preferencji Użytkowników
* Obsługi programów afiliacyjnych
* Zapewnienia prawnie uzasadnionego interesu Administratora
## §7 Pliki Cookies Serwisów zewnętrznych
Administrator w Serwisie wykorzystuje skrypty javascript i komponenty webowe partnerów, którzy mogą umieszczać własne pliki cookies na Urządzeniu Użytkownika. Pamiętaj, że w ustawieniach swojej przeglądarki możesz sam decydować o dozwolonych plikach cookies jakie mogą być używane przez poszczególne witryny internetowe. Poniżej znajduje się lista partnerów lub ich usług zaimplementowanych w Serwisie, mogących umieszczać pliki cookies: 

* **Usługi multimedialne:**
  * https://www.youtube.com/t/terms YouTube
* **Usługi społecznościowe / łączone:** (Rejestracja, Logowanie, udostępnianie treści, komunikacja, itp.)
  * https://twitter.com/en/tos?wcmmode=disabled#intlTerms Twitter
  * https://www.facebook.com/legal/terms Facebook
* **Prowadzenie statystyk:**
  * https://policies.google.com/privacy?hl=pl Google Analytics

Usługi świadczone przez podmioty trzecie są poza kontrolą Administratora. Podmioty te mogą w każdej chwili zmienić swoje warunki świadczenia usług, polityki prywatności, cel przetwarzania danych oraz sposów wykorzystywania plików cookie.

## §8 Rodzaje gromadzonych danych

Serwis gromadzi dane o Użytkownikach. Cześć danych jest gromadzona automatycznie i anonimowo, a część danych to dane osobowe podane dobrowolnie przez Użytkowników w trakcie zapisywania się do poszczególnych usług oferowanych przez Serwis.

**Anonimowe dane gromadzone automatycznie:**

* Adres IP
* Typ przeglądarki
* Rozdzielczość ekranu
* Przybliżona lokalizacja
* Otwierane podstrony serwisu
* Czas spędzony na odpowiedniej podstronie serwisu
* Rodzaj systemu operacyjnego
* Adres poprzedniej podstrony
* Adres strony odsyłającej
* Język przeglądarki
* Prędkość łącza internetowego
* Dostawca usług internetowych
* Dane demograficzne (wiek, płeć)
**Dane gromadzone podczas rejestracji:**
* Imię / nazwisko / pseudonim
* Login
* Adres e-mail
* Adres IP (zbierane automatycznie)
**Dane gromadzone podczas zapisu do usługi Newsletter**
* Adres e-mail
**Dane gromadzone podczas dodawania komentarza**
* Imię i nazwisko / pseudonim
* Adres e-mail
* Adres IP (zbierane automatycznie)
Część danych (bez danych identyfikujących) może być przechowywana w plikach cookies. Cześć danych (bez danych identyfikujących) może być przekazywana do dostawcy usług statystycznych.

## §9 Dostęp do danych osobowych przez podmioty trzecie

Co do zasady jedynym odbiorcą danych osobowych podawanych przez Użytkowników jest Administrator. Dane gromadzone w ramach świadczonych usług nie są przekazywane ani odsprzedawane podmiotom trzecim.

Dostęp do danych (najczęściej na podstawie Umowy powierzenia przetwarzania danych) mogą posiadać podmioty, odpowiedzialne za utrzymania infrastruktury i usług niezbędnych do prowadzenia serwisu tj.:

## §10 Sposób przetwarzania danych osobowych
**Dane osobowe podane dobrowolnie przez Użytkowników:**
* Dane osobowe nie będą przekazywane poza Unię Europejską, chyba że zostały opublikowane na skutek indywidualnego działania Użytkownika (np. wprowadzenie komentarza lub wpisu), co sprawi, że dane będą dostępne dla każdej osoby odwiedzającej serwis.
* Dane osobowe nie będą wykorzystywane do zautomatyzowanego podejmowania decyzji (profilowania).
* Dane osobowe nie będą odsprzedawane podmiotom trzecim.
**Dane anonimowe (bez danych osobowych) gromadzone automatycznie:**
* Dane anonimiwe (bez danych osobowych) będą przekazywane poza Unię Europejską.
* Dane anonimiwe (bez danych osobowych) nie będą wykorzystywane do zautomatyzowanego podejmowania decyzji (profilowania).
* Dane anonimiwe (bez danych osobowych) nie będą odsprzedawane podmiotom trzecim.

## §11 Podstawy prawne przetwarzania danych osobowych
Serwis gromadzi i przetwarza dane Użytkowników na podstawie:
* Rozporządzenia Parlamentu Europejskiego i Rady (UE) 2016/679 z dnia 27 kwietnia 2016 r. w sprawie ochrony osób fizycznych w związku z przetwarzaniem danych osobowych i w sprawie swobodnego przepływu takich danych oraz uchylenia dyrektywy 95/46/WE (ogólne rozporządzenie o ochronie danych)
  * art. 6 ust. 1 lit. a osoba, której dane dotyczą wyraziła zgodę na przetwarzanie swoich danych osobowych w jednym lub większej liczbie określonych celów
  * art. 6 ust. 1 lit. b przetwarzanie jest niezbędne do wykonania umowy, której stroną jest osoba, której dane dotyczą, lub do podjęcia działań na żądanie osoby, której dane dotyczą, przed zawarciem umowy
  * art. 6 ust. 1 lit. f przetwarzanie jest niezbędne do celów wynikających z prawnie uzasadnionych interesów realizowanych przez administratora lub przez stronę trzecią
* Ustawa z dnia 10 maja 2018 r. o ochronie danych osobowych (Dz.U. 2018 poz. 1000)
* Ustawa z dnia 16 lipca 2004 r. Prawo telekomunikacyjne (Dz.U. 2004 nr 171 poz. 1800)
* Ustawa z dnia 4 lutego 1994 r. o prawie autorskim i prawach pokrewnych (Dz. U. 1994 Nr 24 poz. 83)

## §12 Okres przetwarzania danych osobowych

**Dane osobowe podane dobrowolnie przez Użytkowników:**

Co do zasady wskazane dane osobowe są przechowywane wyłącznie przez okres świadczenia Usługi w ramach Serwisu przez Administratora. Są one usuwane lub anonimizowane w okresie do 30 dni od chwili zakończenia świadczenia usług (np. usunięcie zarejestrowanego konta użytkownika, wypisanie z listy Newsletter, itp.)

Wyjątek stanowi sytuacja, która wymaga zabezpieczenia prawnie uzasadnionych celów dalszego przetwarzania tych danych przez Administratora. W takiej sytuacji Administrator będzie przechowywał wskazane dane, od czasu żądania ich usunięcia przez Użytkownika, nie dłużej niż przez okres 3 lat w przypadku naruszenia lub podejrzenia naruszenia zapisów regulaminu serwisu przez Użytkownika

**Dane anonimowe (bez danych osobowych) gromadzone automatycznie:**

Anonimowe dane statystyczne, niestanowiące danych osobowych, są przechowywane przez Administratora w celu prowadzenia statystyk serwisu przez czas nieoznaczony

## §13 Prawa Użytkowników związane z przetwarzaniem danych osobowych

Serwis gromadzi i przetwarza dane Użytkowników na podstawie:
* **Prawo dostępu do danych osobowych**
  * Użytkownikom przysługuje prawo uzyskania dostępu do swoich danych osobowych, realizowane na żądanie złożone do Administratora
* **Prawo do sprostowania danych osobowych**
  * Użytkownikom przysługuje prawo żądania od Administratora niezwłocznego sprostowania danych osobowych, które są nieprawidłowe lub / oraz uzupełnienia niekompletnych danych osobowych, realizowane na żądanie złożone do Administratora
* **Prawo do usunięcia danych osobowych**
  * Użytkownikom przysługuje prawo żądania od Administratora niezwłocznego usunięcia danych osobowych, realizowane na żądanie złożone do AdministratoraW przypadku kont użytkowników, usunięcie danych polega na anonimizacji danych umożliwiających identyfikację Użytkownika. Administrator zastrzega sobie prawo wstrzymania realizacji żądania usunięcia danych w celu ochrony prawnie uzasadnionego interesu Administratora (np. w gdy Użytkownik dopuścił się naruszenia Regulaminu czy dane zostały pozyskane wskutek prowadzonej korespondencji).
  * W przypadku usługi Newsletter, Użytkownik ma możliwość samodzielnego usunięcia swoich danych osobowych korzystając z odnośnika umieszczonego w każdej przesyłanej wiadomości e-mail.
* **Prawo do ograniczenia przetwarzania danych osobowych**
  * Użytkownikom przysługuje prawo ograniczenia przetwarzania danych osobowych w przypadkach wskazanych w art. 18 RODO, m.in. kwestionowania prawidłowość danych osobowych, realizowane na żądanie złożone do Administratora
* **Prawo do przenoszenia danych osobowych**
  * Użytkownikom przysługuje prawo uzyskania od Administratora, danych osobowych dotyczących Użytkownika w ustrukturyzowanym, powszechnie używanym formacie nadającym się do odczytu maszynowego, realizowane na żądanie złożone do Administratora
* **Prawo wniesienia sprzeciwu wobec przetwarzania danych osobowych**
  * Użytkownikom przysługuje prawo wniesienia sprzeciwu wobec przetwarzania jego danych osobowych w przypadkach określonych w art. 21 RODO, realizowane na żądanie złożone do Administratora
* **Prawo wniesienia skargi**
  * Użytkownikom przysługuje prawo wniesienia skargi do organu nadzorczego zajmującego się ochroną danych osobowych.

## §14 Kontakt do Administratora

Z Administratorem można skontaktować się w jeden z poniższych sposobów 
  * **Formularz kontaktowy** - dostępny pod adresem: kontakt@derum.pl

## §15 Wymagania Serwisu
* Ograniczenie zapisu i dostępu do plików Cookie na Urządzeniu Użytkownika może spowodować nieprawidłowe działanie niektórych funkcji Serwisu.
 * Administrator nie ponosi żadnej odpowiedzialności za nieprawidłowo działające funkcje Serwisu w przypadku gdy Użytkownik ograniczy w jakikolwiek sposób możliwość zapisywania i odczytu plików Cookie.
## §16 Linki zewnętrzne

W Serwisie - artykułach, postach, wpisach czy komentarzach Użytkowników mogą znajdować się odnośniki do witryn zewnętrznych, z którymi Właściciel serwisu nie współpracuje. Linki te oraz strony lub pliki pod nimi wskazane mogą być niebezpieczne dla Twojego Urządzenia lub stanowić zagrożenie bezpieczeństwa Twoich danych. Administrator nie ponosi odpowiedzialności za zawartość znajdującą się poza Serwisem.

## §17 Zmiany w Polityce Prywatności
* Administrator zastrzega sobie prawo do dowolnej zmiany niniejszej Polityki Prywatności bez konieczności informowania o tym Użytkowników w zakresie stosowania i wykorzystywania danych anonimowych lub stosowania plików Cookie.
* Administrator zastrzega sobie prawo do dowolnej zmiany niniejszej Polityki Prywatności w zakresie przetwarzania Danych Osobowych, o czym poinformuje Użytkowników posiadających konta użytkownika lub zapisanych do usługi newsletter, za pośrednictwem poczty elektronicznej w terminie do 7 dni od zmiany zapisów. Dalsze korzystanie z usług oznacza zapoznanie się i akceptację wprowadzonych zmian Polityki Prywatności. W przypadku w którym Użytkownik nie będzie się zgadzał z wprowadzonymi zmianami, ma obowiązek usunąć swoje konto z Serwisu lub wypisać się z usługi Newsletter.
 * Wprowadzone zmiany w Polityce Prywatności będą publikowane na tej podstronie Serwisu.
 * Wprowadzone zmiany wchodzą w życie z chwilą ich publikacji.`;

export default function Privacy() {
  useRoomData();

  return (
    <Layout
      title="Polityka prywatności"
      ogDescription="Polityka prywatności derum.pl."
    >
      <StaticPageLayout title="Polityka prywatności">
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
