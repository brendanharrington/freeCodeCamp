--
-- PostgreSQL database dump
--

-- Dumped from database version 12.22 (Ubuntu 12.22-0ubuntu0.20.04.4)
-- Dumped by pg_dump version 12.22 (Ubuntu 12.22-0ubuntu0.20.04.4)

SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SELECT pg_catalog.set_config('search_path', '', false);
SET check_function_bodies = false;
SET xmloption = content;
SET client_min_messages = warning;
SET row_security = off;

DROP DATABASE universe;
--
-- Name: universe; Type: DATABASE; Schema: -; Owner: freecodecamp
--

CREATE DATABASE universe WITH TEMPLATE = template0 ENCODING = 'UTF8' LC_COLLATE = 'C.UTF-8' LC_CTYPE = 'C.UTF-8';


ALTER DATABASE universe OWNER TO freecodecamp;

\connect universe

SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SELECT pg_catalog.set_config('search_path', '', false);
SET check_function_bodies = false;
SET xmloption = content;
SET client_min_messages = warning;
SET row_security = off;

SET default_tablespace = '';

SET default_table_access_method = heap;

--
-- Name: galaxy; Type: TABLE; Schema: public; Owner: freecodecamp
--

CREATE TABLE public.galaxy (
    galaxy_id integer NOT NULL,
    name character varying(50) NOT NULL,
    description text,
    age_in_millions_of_years integer NOT NULL,
    has_life boolean DEFAULT false NOT NULL
);


ALTER TABLE public.galaxy OWNER TO freecodecamp;

--
-- Name: galaxy_galaxy_id_seq; Type: SEQUENCE; Schema: public; Owner: freecodecamp
--

CREATE SEQUENCE public.galaxy_galaxy_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.galaxy_galaxy_id_seq OWNER TO freecodecamp;

--
-- Name: galaxy_galaxy_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: freecodecamp
--

ALTER SEQUENCE public.galaxy_galaxy_id_seq OWNED BY public.galaxy.galaxy_id;


--
-- Name: galaxy_type; Type: TABLE; Schema: public; Owner: freecodecamp
--

CREATE TABLE public.galaxy_type (
    galaxy_type_id integer NOT NULL,
    name character varying(100) NOT NULL,
    description text
);


ALTER TABLE public.galaxy_type OWNER TO freecodecamp;

--
-- Name: galaxy_type_galaxy_type_id_seq; Type: SEQUENCE; Schema: public; Owner: freecodecamp
--

CREATE SEQUENCE public.galaxy_type_galaxy_type_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.galaxy_type_galaxy_type_id_seq OWNER TO freecodecamp;

--
-- Name: galaxy_type_galaxy_type_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: freecodecamp
--

ALTER SEQUENCE public.galaxy_type_galaxy_type_id_seq OWNED BY public.galaxy_type.galaxy_type_id;


--
-- Name: moon; Type: TABLE; Schema: public; Owner: freecodecamp
--

CREATE TABLE public.moon (
    moon_id integer NOT NULL,
    name character varying(100) NOT NULL,
    planet_id integer NOT NULL,
    radius integer NOT NULL,
    is_spherical boolean DEFAULT true NOT NULL,
    surface_description text
);


ALTER TABLE public.moon OWNER TO freecodecamp;

--
-- Name: moon_moon_id_seq; Type: SEQUENCE; Schema: public; Owner: freecodecamp
--

CREATE SEQUENCE public.moon_moon_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.moon_moon_id_seq OWNER TO freecodecamp;

--
-- Name: moon_moon_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: freecodecamp
--

ALTER SEQUENCE public.moon_moon_id_seq OWNED BY public.moon.moon_id;


--
-- Name: planet; Type: TABLE; Schema: public; Owner: freecodecamp
--

CREATE TABLE public.planet (
    planet_id integer NOT NULL,
    name character varying(100) NOT NULL,
    star_id integer NOT NULL,
    has_life boolean DEFAULT false NOT NULL,
    planet_type character varying(50),
    mass numeric(10,2) NOT NULL
);


ALTER TABLE public.planet OWNER TO freecodecamp;

--
-- Name: planet_planet_id_seq; Type: SEQUENCE; Schema: public; Owner: freecodecamp
--

CREATE SEQUENCE public.planet_planet_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.planet_planet_id_seq OWNER TO freecodecamp;

--
-- Name: planet_planet_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: freecodecamp
--

ALTER SEQUENCE public.planet_planet_id_seq OWNED BY public.planet.planet_id;


--
-- Name: star; Type: TABLE; Schema: public; Owner: freecodecamp
--

CREATE TABLE public.star (
    star_id integer NOT NULL,
    name character varying(50) NOT NULL,
    galaxy_id integer NOT NULL,
    temperature numeric(10,2),
    is_spherical boolean DEFAULT true NOT NULL,
    distance_from_earth integer
);


ALTER TABLE public.star OWNER TO freecodecamp;

--
-- Name: star_star_id_seq; Type: SEQUENCE; Schema: public; Owner: freecodecamp
--

CREATE SEQUENCE public.star_star_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.star_star_id_seq OWNER TO freecodecamp;

--
-- Name: star_star_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: freecodecamp
--

ALTER SEQUENCE public.star_star_id_seq OWNED BY public.star.star_id;


--
-- Name: galaxy galaxy_id; Type: DEFAULT; Schema: public; Owner: freecodecamp
--

ALTER TABLE ONLY public.galaxy ALTER COLUMN galaxy_id SET DEFAULT nextval('public.galaxy_galaxy_id_seq'::regclass);


--
-- Name: galaxy_type galaxy_type_id; Type: DEFAULT; Schema: public; Owner: freecodecamp
--

ALTER TABLE ONLY public.galaxy_type ALTER COLUMN galaxy_type_id SET DEFAULT nextval('public.galaxy_type_galaxy_type_id_seq'::regclass);


--
-- Name: moon moon_id; Type: DEFAULT; Schema: public; Owner: freecodecamp
--

ALTER TABLE ONLY public.moon ALTER COLUMN moon_id SET DEFAULT nextval('public.moon_moon_id_seq'::regclass);


--
-- Name: planet planet_id; Type: DEFAULT; Schema: public; Owner: freecodecamp
--

ALTER TABLE ONLY public.planet ALTER COLUMN planet_id SET DEFAULT nextval('public.planet_planet_id_seq'::regclass);


--
-- Name: star star_id; Type: DEFAULT; Schema: public; Owner: freecodecamp
--

ALTER TABLE ONLY public.star ALTER COLUMN star_id SET DEFAULT nextval('public.star_star_id_seq'::regclass);


--
-- Data for Name: galaxy; Type: TABLE DATA; Schema: public; Owner: freecodecamp
--

INSERT INTO public.galaxy VALUES (1, 'Milky Way', 'Our home galaxy', 13600, true);
INSERT INTO public.galaxy VALUES (2, 'Andromeda', 'Nearest spiral galaxy', 10000, false);
INSERT INTO public.galaxy VALUES (3, 'Triangulum', 'Member of the Local Group', 12000, false);
INSERT INTO public.galaxy VALUES (4, 'Whirlpool', 'Famous spiral with companion galaxy', 10000, false);
INSERT INTO public.galaxy VALUES (5, 'Sombrero', 'Spiral galaxy with bright nucleus', 13000, false);
INSERT INTO public.galaxy VALUES (6, 'Messier 87', 'Elliptical galaxy with a giant black hole', 13000, false);


--
-- Data for Name: galaxy_type; Type: TABLE DATA; Schema: public; Owner: freecodecamp
--

INSERT INTO public.galaxy_type VALUES (1, 'Spiral', 'Flat, rotating disk of stars, gas, and dust with a central bulge and spiral arms');
INSERT INTO public.galaxy_type VALUES (2, 'Elliptical', 'Smooth, featureless galaxies that are more 3D, ranging from nearly spherical to elongated');
INSERT INTO public.galaxy_type VALUES (3, 'Irregular', 'Galaxies without a defined shape, often chaotic in appearance');
INSERT INTO public.galaxy_type VALUES (4, 'Lenticular', 'Intermediate between spiral and elliptical, with a disk but no significant spiral structure');
INSERT INTO public.galaxy_type VALUES (5, 'Peculiar', 'Galaxies with unusual shapes, often caused by interactions or collisions');
INSERT INTO public.galaxy_type VALUES (6, 'Dwarf', 'Small galaxies containing up to several billion stars, often companions of larger galaxies');


--
-- Data for Name: moon; Type: TABLE DATA; Schema: public; Owner: freecodecamp
--

INSERT INTO public.moon VALUES (1, 'Luna', 1, 1737, true, 'Rocky, dusty surface with craters');
INSERT INTO public.moon VALUES (2, 'Phobos', 2, 11, false, 'Irregularly shaped, dusty');
INSERT INTO public.moon VALUES (3, 'Deimos', 2, 6, false, 'Small, smooth surface');
INSERT INTO public.moon VALUES (4, 'Io', 3, 1821, true, 'Volcanically active surface');
INSERT INTO public.moon VALUES (5, 'Europa', 3, 1560, true, 'Icy surface with subsurface ocean');
INSERT INTO public.moon VALUES (6, 'Ganymede', 3, 2634, true, 'Largest moon in the Solar System');
INSERT INTO public.moon VALUES (7, 'Callisto', 3, 2410, true, 'Heavily cratered surface');
INSERT INTO public.moon VALUES (8, 'Titan', 4, 2575, true, 'Thick atmosphere, methane lakes');
INSERT INTO public.moon VALUES (9, 'Enceladus', 4, 252, true, 'Icy surface with geysers');
INSERT INTO public.moon VALUES (10, 'Rhea', 4, 764, true, 'Icy, cratered surface');
INSERT INTO public.moon VALUES (11, 'Proxima b I', 5, 500, true, 'Rocky exomoon');
INSERT INTO public.moon VALUES (12, 'Proxima b II', 5, 350, true, 'Icy crust, possible ocean');
INSERT INTO public.moon VALUES (13, 'Andromeda I-a', 6, 1200, true, 'Gas moon with thick haze');
INSERT INTO public.moon VALUES (14, 'Andromeda I-b', 6, 800, true, 'Volcanically active');
INSERT INTO public.moon VALUES (15, 'Andromeda II-a', 7, 400, true, 'Desert-like rocky terrain');
INSERT INTO public.moon VALUES (16, 'Triangulum Prime I', 8, 1500, true, 'Stormy atmosphere');
INSERT INTO public.moon VALUES (17, 'Triangulum Prime II', 8, 900, true, 'Ice-covered');
INSERT INTO public.moon VALUES (18, 'Triangulum Secundus I', 9, 700, true, 'Cratered rocky moon');
INSERT INTO public.moon VALUES (19, 'Whirlpool Alpha I', 10, 1300, true, 'Hot volcanic activity');
INSERT INTO public.moon VALUES (20, 'Whirlpool Beta I', 11, 600, true, 'Frozen icy shell');
INSERT INTO public.moon VALUES (21, 'Sombrero One I', 12, 1100, true, 'Dense clouds, strong winds');
INSERT INTO public.moon VALUES (22, 'M87-World I', 13, 2000, true, 'Supermassive rocky moon');


--
-- Data for Name: planet; Type: TABLE DATA; Schema: public; Owner: freecodecamp
--

INSERT INTO public.planet VALUES (1, 'Earth', 1, true, 'Terrestrial', 1.00);
INSERT INTO public.planet VALUES (2, 'Mars', 1, false, 'Terrestrial', 0.11);
INSERT INTO public.planet VALUES (3, 'Jupiter', 1, false, 'Gas Giant', 317.80);
INSERT INTO public.planet VALUES (4, 'Saturn', 1, false, 'Gas Giant', 95.20);
INSERT INTO public.planet VALUES (5, 'Proxima b', 2, false, 'Exoplanet', 1.30);
INSERT INTO public.planet VALUES (6, 'Andromeda I', 3, false, 'Gas Giant', 200.00);
INSERT INTO public.planet VALUES (7, 'Andromeda II', 3, false, 'Terrestrial', 0.80);
INSERT INTO public.planet VALUES (8, 'Triangulum Prime', 4, false, 'Gas Giant', 250.00);
INSERT INTO public.planet VALUES (9, 'Triangulum Secundus', 4, false, 'Terrestrial', 1.50);
INSERT INTO public.planet VALUES (10, 'Whirlpool Alpha', 5, false, 'Gas Giant', 180.00);
INSERT INTO public.planet VALUES (11, 'Whirlpool Beta', 5, false, 'Ice Giant', 14.00);
INSERT INTO public.planet VALUES (12, 'Sombrero One', 6, false, 'Gas Giant', 300.00);
INSERT INTO public.planet VALUES (13, 'M87-World', 7, false, 'Super-Earth', 10.00);


--
-- Data for Name: star; Type: TABLE DATA; Schema: public; Owner: freecodecamp
--

INSERT INTO public.star VALUES (1, 'Sun', 1, 5778.00, true, 0);
INSERT INTO public.star VALUES (2, 'Proxima Centauri', 1, 3042.00, true, 4);
INSERT INTO public.star VALUES (3, 'Alpheratz', 2, 13800.00, true, 97);
INSERT INTO public.star VALUES (4, 'M33-1', 3, 11000.00, true, 3000);
INSERT INTO public.star VALUES (5, 'NGC 5194-V1', 4, 9500.00, true, 23000);
INSERT INTO public.star VALUES (6, 'Sombrero A', 5, 7200.00, true, 29000);
INSERT INTO public.star VALUES (7, 'M87-V1', 6, 8700.00, true, 53000);


--
-- Name: galaxy_galaxy_id_seq; Type: SEQUENCE SET; Schema: public; Owner: freecodecamp
--

SELECT pg_catalog.setval('public.galaxy_galaxy_id_seq', 6, true);


--
-- Name: galaxy_type_galaxy_type_id_seq; Type: SEQUENCE SET; Schema: public; Owner: freecodecamp
--

SELECT pg_catalog.setval('public.galaxy_type_galaxy_type_id_seq', 6, true);


--
-- Name: moon_moon_id_seq; Type: SEQUENCE SET; Schema: public; Owner: freecodecamp
--

SELECT pg_catalog.setval('public.moon_moon_id_seq', 22, true);


--
-- Name: planet_planet_id_seq; Type: SEQUENCE SET; Schema: public; Owner: freecodecamp
--

SELECT pg_catalog.setval('public.planet_planet_id_seq', 13, true);


--
-- Name: star_star_id_seq; Type: SEQUENCE SET; Schema: public; Owner: freecodecamp
--

SELECT pg_catalog.setval('public.star_star_id_seq', 7, true);


--
-- Name: galaxy galaxy_name_key; Type: CONSTRAINT; Schema: public; Owner: freecodecamp
--

ALTER TABLE ONLY public.galaxy
    ADD CONSTRAINT galaxy_name_key UNIQUE (name);


--
-- Name: galaxy galaxy_pkey; Type: CONSTRAINT; Schema: public; Owner: freecodecamp
--

ALTER TABLE ONLY public.galaxy
    ADD CONSTRAINT galaxy_pkey PRIMARY KEY (galaxy_id);


--
-- Name: galaxy_type galaxy_type_name_key; Type: CONSTRAINT; Schema: public; Owner: freecodecamp
--

ALTER TABLE ONLY public.galaxy_type
    ADD CONSTRAINT galaxy_type_name_key UNIQUE (name);


--
-- Name: galaxy_type galaxy_type_pkey; Type: CONSTRAINT; Schema: public; Owner: freecodecamp
--

ALTER TABLE ONLY public.galaxy_type
    ADD CONSTRAINT galaxy_type_pkey PRIMARY KEY (galaxy_type_id);


--
-- Name: moon moon_name_key; Type: CONSTRAINT; Schema: public; Owner: freecodecamp
--

ALTER TABLE ONLY public.moon
    ADD CONSTRAINT moon_name_key UNIQUE (name);


--
-- Name: moon moon_pkey; Type: CONSTRAINT; Schema: public; Owner: freecodecamp
--

ALTER TABLE ONLY public.moon
    ADD CONSTRAINT moon_pkey PRIMARY KEY (moon_id);


--
-- Name: planet planet_name_key; Type: CONSTRAINT; Schema: public; Owner: freecodecamp
--

ALTER TABLE ONLY public.planet
    ADD CONSTRAINT planet_name_key UNIQUE (name);


--
-- Name: planet planet_pkey; Type: CONSTRAINT; Schema: public; Owner: freecodecamp
--

ALTER TABLE ONLY public.planet
    ADD CONSTRAINT planet_pkey PRIMARY KEY (planet_id);


--
-- Name: star star_name_key; Type: CONSTRAINT; Schema: public; Owner: freecodecamp
--

ALTER TABLE ONLY public.star
    ADD CONSTRAINT star_name_key UNIQUE (name);


--
-- Name: star star_pkey; Type: CONSTRAINT; Schema: public; Owner: freecodecamp
--

ALTER TABLE ONLY public.star
    ADD CONSTRAINT star_pkey PRIMARY KEY (star_id);


--
-- Name: moon moon_planet_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: freecodecamp
--

ALTER TABLE ONLY public.moon
    ADD CONSTRAINT moon_planet_id_fkey FOREIGN KEY (planet_id) REFERENCES public.planet(planet_id);


--
-- Name: planet planet_star_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: freecodecamp
--

ALTER TABLE ONLY public.planet
    ADD CONSTRAINT planet_star_id_fkey FOREIGN KEY (star_id) REFERENCES public.star(star_id);


--
-- Name: star star_galaxy_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: freecodecamp
--

ALTER TABLE ONLY public.star
    ADD CONSTRAINT star_galaxy_id_fkey FOREIGN KEY (galaxy_id) REFERENCES public.galaxy(galaxy_id);


--
-- PostgreSQL database dump complete
--

