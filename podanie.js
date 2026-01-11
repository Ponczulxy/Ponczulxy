document.getElementById('app-form').addEventListener('submit', async function(e) {
    e.preventDefault();

    const btn = document.getElementById('submit-btn');
    btn.innerText = "WYSYŁANIE DO SYSTEMU...";
    btn.disabled = true;

    // Pobieramy ID Discorda
    const userId = document.getElementById('p_dc').value;

    const getValue = (id) => {
        const el = document.getElementById(id);
        return el ? el.value : "Brak danych";
    };

    const podanieData = {
        user_id: userId,
        answers: {
            "Nick z Minecrafta": getValue("p_mc"),
            "1) Jak masz na imię?": getValue("p1"),
            "2) Ile masz lat?": getValue("p2"),
            "3) Posiadasz MINECRAFT PREMIUM?": getValue("p3"),
            "4) Opisz swoją osobę w paru zdaniach.": getValue("p4"),
            "5) Wymień pięć swoich wad oraz zalet.": getValue("p5"),
            "6) Dlaczego to właśnie Ty powinieneś zostać przyjęty/a?": getValue("p6"),
            "7) Czy pełniłeś/as już podobną funkcję na innym serwerze?": getValue("p7"),
            "8) Ile godzin dziennie jesteś w stanie spędzić na serwerze?": getValue("p8"),
            "9) Oceń swoją znajomość ortografii (1-10).": getValue("p9") + "/10",
            "10) Oceń swoją znajomość regulaminu (1-10).": getValue("p10") + "/10",
            "11) Oceń (1-10) umiejętności sprawdzania i opisz metodę.": getValue("p11"),
            "12) Gdzie widzisz się za 3 miesiące?": getValue("p12")
        }
    };

    try {
        // Skonfigurowane pod serwer KeyHost port 25608
        const response = await fetch('http://144.76.97.203:25608/wyslij_podanie', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(podanieData)
        });

        if (response.ok) {
            btn.innerText = "WYSLANO POMYŚLNIE";
            btn.style.background = "#2ecc71";
            setTimeout(() => { window.location.href = "index.html"; }, 1500);
        } else {
            throw new Error("Serwer bota zwrócił błąd.");
        }
    } catch (error) {
        btn.innerText = "BŁĄD POŁĄCZENIA Z BOTEM";
        btn.style.background = "#e74c3c";
        btn.disabled = false;
        
        console.error("BŁĄD: Sprawdź czy bot działa na 144.76.97.203:25608");
        // Przypomnienie o HTTPS (GitHub)
        console.warn("Jeśli strona jest na GitHubie, odblokuj 'Insecure content' w ustawieniach przeglądarki!");
    }
});