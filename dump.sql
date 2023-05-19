--
-- PostgreSQL database dump
--

-- Dumped from database version 15.2
-- Dumped by pg_dump version 15.2

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
-- Name: urls; Type: TABLE; Schema: public; Owner: -
--
CREATE USER shortlydbuser WITH PASSWORD 'senha_ultra_secreta_do_usuario_shortlydbuser';
GRANT ALL PRIVILEGES ON ALL TABLES IN SCHEMA public TO shortlydbuser;
GRANT ALL PRIVILEGES ON ALL SEQUENCES IN SCHEMA public TO shortlydbuser;

CREATE TABLE public.urls (
    id integer NOT NULL,
    "shortUrl" character varying NOT NULL,
    url character varying NOT NULL,
    "visitCount" integer,
    "userId" integer,
    "createdAt" timestamp without time zone DEFAULT CURRENT_TIMESTAMP
);


--
-- Name: urls_id_seq; Type: SEQUENCE; Schema: public; Owner: -
--

CREATE SEQUENCE public.urls_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


--
-- Name: urls_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: -
--

ALTER SEQUENCE public.urls_id_seq OWNED BY public.urls.id;


--
-- Name: users; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.users (
    id integer NOT NULL,
    name character varying NOT NULL,
    email character varying NOT NULL,
    password character varying NOT NULL,
    "createdAt" timestamp without time zone DEFAULT CURRENT_TIMESTAMP,
    "refreshToken" character varying(255)
);


--
-- Name: users_id_seq; Type: SEQUENCE; Schema: public; Owner: -
--

CREATE SEQUENCE public.users_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


--
-- Name: users_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: -
--

ALTER SEQUENCE public.users_id_seq OWNED BY public.users.id;


--
-- Name: urls id; Type: DEFAULT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.urls ALTER COLUMN id SET DEFAULT nextval('public.urls_id_seq'::regclass);


--
-- Name: users id; Type: DEFAULT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.users ALTER COLUMN id SET DEFAULT nextval('public.users_id_seq'::regclass);


--
-- Data for Name: urls; Type: TABLE DATA; Schema: public; Owner: -
--

INSERT INTO public.urls VALUES (2, 'hGbpt5', 'https://www.figma.com/file/DWg9233KR2GS6RLvfZRwyd/Shortly?type=design&node-id=1-2&t=VGKJ6JmBLCtaHMdK-0', 19, 1, '2023-05-18 19:34:54.852723');
INSERT INTO public.urls VALUES (1, 'n5eIPT', 'http://localhost:5173/home', 32, 1, '2023-05-18 15:04:28.988209');
INSERT INTO public.urls VALUES (3, '5qTXt8', 'https://scontent.fcgh10-1.fna.fbcdn.net/v/t39.30808-6/296381730_383236407247843_4149487714577975930_n.jpg?_nc_cat=111&ccb=1-7&_nc_sid=09cbfe&_nc_eui2=AeFEjPMWbRC_-iXv91XJCiHrj5KEHyD-BXCPkoQfIP4FcNjvcRbwRDtmjAYwHxZqGhAH2q3xNh6vMtVh2hj2Bg5l&_nc_ohc=ykhvKq8-2e0AX9r4cSM&_nc_ht=scontent.fcgh10-1.fna&oh=00_AfBk8HjUdeyL8i3ZF22VRpvdam5fppTA8gH-Q503YOSEmg&oe=646ADC0E', 2, 1, '2023-05-18 22:04:55.94238');


--
-- Data for Name: users; Type: TABLE DATA; Schema: public; Owner: -
--

INSERT INTO public.users VALUES (1, 'Thomas Andrioli Leick', 'thomasaleick@gmail.com', '$2b$10$v0icviy/gTSVgVF7owNci.WTR.WaqlJD8wgUFBx0CC7AzT7Emkdza', '2023-05-16 12:22:15.708566', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwiaWF0IjoxNjg0NDY2NTg0LCJleHAiOjE3NzA4NjY1ODR9.yFx3XAquzYZr9CL6GlmvEBBsQgBbOutsBSFQb-S1mVM');
INSERT INTO public.users VALUES (2, 'Thomas Andrioli Leick', '12thomasaleick@gmail.com', '$2b$10$cMrOIJWCXYTH8XA2gDBN8OvaR11WD12y10AdJtzGXZA8S7DDr2Vj2', '2023-05-17 20:12:44.059986', NULL);


--
-- Name: urls_id_seq; Type: SEQUENCE SET; Schema: public; Owner: -
--

SELECT pg_catalog.setval('public.urls_id_seq', 6, true);


--
-- Name: users_id_seq; Type: SEQUENCE SET; Schema: public; Owner: -
--

SELECT pg_catalog.setval('public.users_id_seq', 2, true);


--
-- Name: urls urls_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.urls
    ADD CONSTRAINT urls_pkey PRIMARY KEY (id);


--
-- Name: urls urls_shorturl_key; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.urls
    ADD CONSTRAINT urls_shorturl_key UNIQUE ("shortUrl");


--
-- Name: users users_email_key; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.users
    ADD CONSTRAINT users_email_key UNIQUE (email);


--
-- Name: users users_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.users
    ADD CONSTRAINT users_pkey PRIMARY KEY (id);


--
-- Name: urls urls_userid_fkey; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.urls
    ADD CONSTRAINT urls_userid_fkey FOREIGN KEY ("userId") REFERENCES public.users(id);


--
-- Name: TABLE urls; Type: ACL; Schema: public; Owner: -
--

GRANT ALL ON TABLE public.urls TO shortlydbuser;


--
-- Name: SEQUENCE urls_id_seq; Type: ACL; Schema: public; Owner: -
--

GRANT ALL ON SEQUENCE public.urls_id_seq TO shortlydbuser;


--
-- Name: TABLE users; Type: ACL; Schema: public; Owner: -
--

GRANT ALL ON TABLE public.users TO shortlydbuser;


--
-- Name: SEQUENCE users_id_seq; Type: ACL; Schema: public; Owner: -
--

GRANT ALL ON SEQUENCE public.users_id_seq TO shortlydbuser;


--
-- PostgreSQL database dump complete
--

