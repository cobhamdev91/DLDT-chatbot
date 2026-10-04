/**
 * @file modules/culture/components/SongList.js
 * @description Lưới thẻ "Thưởng thức làn điệu cổ": mỗi thẻ có nút nghe thử,
 * tại một thời điểm chỉ một bài ở trạng thái "đang phát" (bấm lại để dừng).
 */

'use client';

import { useState } from 'react';
import { Clock, Pause, Play } from 'lucide-react';
import IconText from '@/components/shared/IconText/IconText';
import { culture as t } from '@/locales/vi/culture';
import { cx } from '@/logic/classNames';

/**
 * Một thẻ bài hát.
 * @param {Object} props
 * @param {{ title: string, type: string, dur: string, desc: string }} props.song - Bài hát.
 * @param {boolean} props.isPlaying - Bài đang phát?
 * @param {() => void} props.onToggle - Bật/tắt phát thử.
 * @returns {JSX.Element}
 */
function SongCard({ song, isPlaying, onToggle }) {
  const PlayIcon = isPlaying ? Pause : Play;

  return (
    <div className={cx('song-card', isPlaying && 'song-card--playing')}>
      {/* Hàng đầu: loại giọng – thời lượng */}
      <div className="song-card__head">
        <span className="song-card__type">{song.type}</span>
        <IconText gap="xs" className="song-card__duration">
          <Clock size={15} /> {song.dur}
        </IconText>
      </div>

      <h4 className="song-card__title">{song.title}</h4>
      <p className="song-card__desc">{song.desc}</p>

      {/* Nút nghe thử */}
      <button
        type="button"
        aria-pressed={isPlaying}
        className={cx('song-card__play', isPlaying && 'song-card__play--active')}
        onClick={onToggle}
      >
        <PlayIcon size={15} fill="currentColor" />
        <span>{isPlaying ? t.songs.playing : t.songs.play}</span>
      </button>
    </div>
  );
}

/**
 * @param {{ songs: Array<{ title: string, type: string, dur: string, desc: string }> }} props
 * @returns {JSX.Element}
 */
export default function SongList({ songs }) {
  /** Tên bài đang phát (null = không phát) */
  const [playing, setPlaying] = useState(null);

  /**
   * Bật bài mới hoặc tắt nếu bấm lại bài đang phát.
   * @param {string} title - Tên bài.
   */
  const toggle = (title) => setPlaying((current) => (current === title ? null : title));

  return (
    <section className="container spacer-bottom-lg">
      <div className="song-grid">
        {songs.map((song) => (
          <SongCard
            key={song.title}
            song={song}
            isPlaying={playing === song.title}
            onToggle={() => toggle(song.title)}
          />
        ))}
      </div>
    </section>
  );
}
